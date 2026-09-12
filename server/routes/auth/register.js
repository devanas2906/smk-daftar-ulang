const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');
const Student = require('../../models/student.js');
const ReRegistration = require('../../models/reregistration.js');

const { redis } = require('../../config/redis.js');
const { deleteAsset } = require('../../config/cloudinary.js');
const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const uploadPdf = require('../../middlewares/upload-middleware.js');

const { populateDocumentUrlsAndIds } = require('../../utilities/student/document-files.js');
const { hashPassword, generateToken } = require('../../utilities/auth.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

const purposeOtp = "register";

// create account
router.post('/',
    uploadPdf.fields([
        { name: 'kartuTandaPenduduk', maxCount: 1 },
        { name: 'kartuKeluarga', maxCount: 1 },
        { name: 'ijazahSmp', maxCount: 1 },
        { name: 'buktiPembayaran', maxCount: 1 }
    ]),
    validateBody(schemas.register),
    async (req, res, next) => {
        const documentFiles = req.files || {};
        const { kartuTandaPenduduk, kartuKeluarga, ijazahSmp, buktiPembayaran } = documentFiles;

        const isRequireFiles = [kartuTandaPenduduk, kartuKeluarga, ijazahSmp, buktiPembayaran].every(requireFile => Boolean(requireFile));
        if (!isRequireFiles) return res.status(400).json({ success: false, message: "File dokumen tidak lengkap" });

        const { registrationToken: currentRegistrationToken, nisn, name, parentName, address, email, password, paymentAmount, batch, major } = req.body;

        const newUserPayload = { email, isDefaultPassword: false, role: "student", accountStatus: "pending_verification" };
        const newStudentPayload = { batch, major, nisn, name, parentName, address };
        const newReRegistrationPayload = { paymentAmount, status: "pending_verification" };

        const mongooseTransaction = new MongooseTransaction();
        const session = await mongooseTransaction.startTransaction();

        try {
            const verifiedCachedData = await redis.get(`verified-otp:${purposeOtp}:${email}`);
            if (!verifiedCachedData) {
                await mongooseTransaction.failedTransaction();
                return res.status(410).json({ success: false, message: "Kode OTP tidak valid atau sudah kedaluwarsa" });
            };

            const { registrationToken: savedRegistrationToken } = verifiedCachedData;

            if (currentRegistrationToken !== savedRegistrationToken) {
                await mongooseTransaction.failedTransaction();
                return res.status(400).json({ success: false, message: "Token registrasi tidak valid" });
            };

            const hashedPassword = await hashPassword(password);
            newUserPayload.password = hashedPassword;

            const newUserDocument = new User(newUserPayload);
            const { _id: newUserDocumentId } = await newUserDocument.save({ session });

            newStudentPayload.user = newUserDocumentId;

            const newStudentDocument = new Student(newStudentPayload);
            const { _id: newStudentDocumentId } = await newStudentDocument.save({ session });

            newReRegistrationPayload.student = newStudentDocumentId;

            await populateDocumentUrlsAndIds(documentFiles, newReRegistrationPayload);
            await ReRegistration.create([newReRegistrationPayload], { session });

            await mongooseTransaction.successTransaction();

            await redis.del(`verified-otp:${purposeOtp}:${email}`);

            const token = generateToken(newUserDocument);

            res.json({ success: true, message: "Berhasil melakukan registrasi", token });
        } catch (error) {
            await mongooseTransaction.failedTransaction();

            const { kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId } = newReRegistrationPayload;
            const deleteAssetPromises = [kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId].map(publicId => deleteAsset(publicId));
            await Promise.all(deleteAssetPromises);

            if (error.code === 11000) {
                const { keyValue } = error;
                const keyProperty = Object.keys(keyValue)[0];
                const valueProperty = Object.values(keyValue)[0];

                const duplicateData = {
                    email: { message: `Email ${valueProperty} sudah terdaftar` },
                    nisn: { message: `NISN ${valueProperty} sudah terdaftar` },
                };

                return res.status(400).json({ success: false, message: duplicateData[keyProperty].message });
            };

            next(error);
        };
    });

module.exports = router;