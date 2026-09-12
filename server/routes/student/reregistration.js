const express = require('express');

const Student = require('../../models/student.js');
const ReRegistration = require('../../models/reregistration.js');

const { restrictStudentReRegistration } = require('../../middlewares/auth-middleware.js');
const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const uploadPdf = require('../../middlewares/upload-middleware.js');
const { deleteAsset } = require('../../config/cloudinary.js');

const { getRetainedDocumentPublicId, populateDocumentUrlsAndIds } = require('../../utilities/student/document-files.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const registrationDocuments = await ReRegistration.find()
            .populate({
                path: "student",
                match: { user: userDocumentId }
            })
            .sort({ createdAt: -1 });

        const filteredRegistrationDocuments = registrationDocuments.filter(registrationDocument => registrationDocument.student !== null);

        res.json({ success: true, reRegistrations: filteredRegistrationDocuments });
    } catch (error) {
        next(error);
    };
});

router.post('/',
    restrictStudentReRegistration,
    uploadPdf.fields([
        { name: 'kartuTandaPenduduk', maxCount: 1 },
        { name: 'kartuKeluarga', maxCount: 1 },
        { name: 'ijazahSmp', maxCount: 1 },
        { name: 'buktiPembayaran', maxCount: 1 }
    ]),
    validateBody(schemas.reRegistration),
    async (req, res, next) => {
        const userDocumentId = req.user._id;
        const { paymentAmount, modeDraft } = req.body || {};
        const documentFiles = req.files || {};

        const reRegistrationResponseMessage = modeDraft ? "Berhasil membuat dokumen daftar ulang." : "Pengajuan dokumen daftar ulang berhasil dikirim.";
        const createReRegistrationDocument = {};

        const hasDocumentFiles = Object.keys(documentFiles).length > 0;

        try {
            const { _id: studentDocumentId } = await Student.findOne({ user: userDocumentId });

            const processReRegistrationDocument = await ReRegistration.findOne({ student: studentDocumentId, status: { $in: ["pending_verification", "pending", "revision"] } });
            if (processReRegistrationDocument) return res.status(400).json({ success: false, message: 'Anda masih memiliki pengajuan yang masih diproses.' });

            createReRegistrationDocument.student = studentDocumentId;
            createReRegistrationDocument.paymentAmount = paymentAmount;
            createReRegistrationDocument.status = modeDraft ? modeDraft : "pending";

            if (hasDocumentFiles) await populateDocumentUrlsAndIds(documentFiles, createReRegistrationDocument);

            await ReRegistration.create(createReRegistrationDocument);

            res.status(201).json({ success: true, message: reRegistrationResponseMessage });
        } catch (error) {

            if (hasDocumentFiles) {
                const { kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId } = createReRegistrationDocument;
                const deleteAssetPromises = [kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId].map(publicId => deleteAsset(publicId));
                await Promise.all(deleteAssetPromises);
            };

            next(error);
        };
    }
);

router.put('/:id',
    restrictStudentReRegistration,
    uploadPdf.fields([
        { name: 'kartuTandaPenduduk', maxCount: 1 },
        { name: 'kartuKeluarga', maxCount: 1 },
        { name: 'ijazahSmp', maxCount: 1 },
        { name: 'buktiPembayaran', maxCount: 1 },
    ]),
    validateBody(schemas.reRegistration),
    async (req, res, next) => {
        const userDocumentId = req.user._id;
        const reRegistrationDocumentId = req.params.id;
        const { paymentAmount, modeDraft, files } = req.body || {};
        const documentFiles = req.files || {};

        const validUpdateReRegistrationStatus = ["draft", "revision"];
        const reRegistrationResponseMessage = modeDraft ? "Dokumen daftar ulang berhasil di-update." : "Pengajuan dokumen daftar ulang berhasil dikirim.";
        const updateReRegistrationDocument = {};

        const hasDocumentFiles = Object.keys(documentFiles).length > 0;

        try {
            const studentDocument = await Student.findOne({ user: userDocumentId }).populate("user");
            if (!studentDocument) return res.status(404).json({ success: false, message: 'Data siswa tidak ditemukan.' });

            const { _id: studentDocumentId, user: { accountStatus } } = studentDocument;

            const reRegistrationDocument = await ReRegistration.findOne({ _id: reRegistrationDocumentId, student: studentDocumentId });
            if (!reRegistrationDocument) return res.status(404).json({ success: false, message: 'Berkas daftar ulang tidak ditemukan.' });

            const { kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId, status: currentReRegistrationStatus } = reRegistrationDocument;
            if (!validUpdateReRegistrationStatus.includes(currentReRegistrationStatus)) return res.status(400).json({ success: false, message: 'Berkas daftar ulang Anda sudah diproses.' });

            const newReRegistrationStatus = modeDraft && currentReRegistrationStatus !== "revision" ? modeDraft : accountStatus === "pending_verification" ? "pending_verification" : "pending";

            updateReRegistrationDocument.paymentAmount = paymentAmount;
            updateReRegistrationDocument.status = newReRegistrationStatus;

            // add new file to cloudinary
            if (hasDocumentFiles) await populateDocumentUrlsAndIds(documentFiles, updateReRegistrationDocument);

            // delete file from cloudinary
            const retainedDocumentUrls = JSON.parse(files);
            const documentPublicIds = [kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId];
            const retainedDocumentPublicIds = getRetainedDocumentPublicId(documentPublicIds, retainedDocumentUrls);
            const deleteDocumentPublicIds = documentPublicIds.filter(documentPublicId => !retainedDocumentPublicIds.includes(documentPublicId));

            const { acknowledged, matchedCount } = await ReRegistration.updateOne({ _id: reRegistrationDocumentId }, updateReRegistrationDocument);
            if (acknowledged && matchedCount === 1 && deleteDocumentPublicIds.length) await Promise.all(deleteDocumentPublicIds.map(deleteDocumentPublicId => deleteAsset(deleteDocumentPublicId)));

            res.status(200).json({ success: true, message: reRegistrationResponseMessage });
        } catch (error) {

            if (hasDocumentFiles) {
                const { kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId } = updateReRegistrationDocument;
                const deleteAssetPromises = [kartuTandaPendudukPublicId, kartuKeluargaPublicId, ijazahSmpPublicId, buktiPembayaranPublicId].map(publicId => deleteAsset(publicId));
                await Promise.all(deleteAssetPromises);
            };

            next(error);
        };
    }
);

module.exports = router;
