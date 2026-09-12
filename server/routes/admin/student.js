const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');
const Student = require('../../models/student.js');

const ReRegistration = require('../../models/reregistration.js');
const Notification = require('../../models/notification.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware');

const { hashPassword } = require('../../utilities/auth.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

router.get('/', async (req, res, next) => {
    const { name, nisn, major, batch, class: studentClass } = req.query;

    const userFilter = { role: 'student' };
    const studentFilter = {};

    if (name) userFilter.name = { $regex: name, $options: 'i' };
    if (nisn) userFilter.nisn = nisn;

    if (batch) studentFilter.batch = batch;
    if (major) studentFilter.major = major;
    if (studentClass) studentFilter.class = studentClass;

    try {
        const studentDocuments = await Student.find(studentFilter)
            .populate({
                path: 'user',
                select: 'email accountStatus scheduledDeletionAt',
                match: userFilter
            })
            .populate('batch', 'entryYear')
            .populate('major', 'majorName majorCode')
            .populate('class', 'className')
            .sort({ createdAt: -1 });

        const filteredStudentDocuments = studentDocuments.filter(studentDocument => studentDocument.user !== null);

        res.json({ success: true, students: filteredStudentDocuments });
    } catch (error) {
        next(error);
    };
});

router.post('/restore/:id', async (req, res, next) => {
    const userDocumentId = req.params.id;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const existingUserDocument = await User.findOne({ _id: userDocumentId, role: 'student' });
        if (!existingUserDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan.' });
        };

        if (existingUserDocument.accountStatus !== "rejected") {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Status akun siswa tidak memungkinkan untuk membatalkan penolakan.' });
        };

        existingUserDocument.accountStatus = "pending_verification";
        existingUserDocument.scheduledDeletionAt = null;
        await existingUserDocument.save({ session });

        const { _id: studentDocumentId } = await Student.findOne({ user: userDocumentId });

        await ReRegistration.updateOne({ student: studentDocumentId }, { status: "pending_verification", note: "" }, { session });
        await Notification.create([{ user: userDocumentId, type: "info", message: "Pengajuan daftar ulang Anda telah dipulihkan, mohon tunggu verifikasinya." }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: "Berhasil membatalkan penolakan akun" });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

router.post('/', validateBody(schemas.createStudent), async (req, res, next) => {
    const { email, nisn, name, batch, major, class: studentClass, parentName, address } = req.body;

    const newUserPayload = { email, isDefaultPassword: true, role: "student" };
    const newStudentPayload = { batch, major, class: studentClass, nisn, name, parentName, address };

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const hashedPassword = await hashPassword(process.env.DEFAULT_STUDENT_PASSWORD);
        newUserPayload.password = hashedPassword;

        const newUserDocument = new User(newUserPayload);
        const savedUserDocument = await newUserDocument.save({ session });

        newStudentPayload.user = savedUserDocument._id;

        const newStudentDocument = new Student(newStudentPayload);
        const savedStudentDocument = await newStudentDocument.save({ session });

        await mongooseTransaction.successTransaction();

        res.status(201).json({ success: true, message: 'Siswa berhasil ditambahkan.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();

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

router.put('/:id', validateBody(schemas.updateStudent), async (req, res, next) => {
    const userDocumentId = req.params.id;

    const { email, nisn, name, batch, major, class: studentClass, parentName, address, accountStatus } = req.body;
    const updateUserPayload = { email };
    const updateStudentPayload = { batch, major, nisn, name, parentName, address };

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const existingUserDocument = await User.findOne({ _id: userDocumentId, role: 'student' });

        if (!existingUserDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan.' });
        };

        if (existingUserDocument.accountStatus !== "pending_verification") {
            updateUserPayload.accountStatus = accountStatus;
            updateStudentPayload.class = studentClass;
        };

        await User.updateOne({ _id: userDocumentId }, updateUserPayload, { session });
        await Student.updateOne({ user: userDocumentId }, updateStudentPayload, { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: 'Data siswa berhasil diperbarui.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();

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
