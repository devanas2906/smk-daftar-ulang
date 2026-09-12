const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');
const Student = require('../../models/student.js');
const Notification = require('../../models/notification.js');
const DeleteRequest = require('../../models/delete-request.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

router.get('/', async (_, res, next) => {

    try {
        const deleteRequestDocuments = await DeleteRequest.find({ status: 'pending' });
        const userDocumentIds = deleteRequestDocuments.map(deleteRequestDocument => deleteRequestDocument.user);
        const studentDocuments = await Student.find({ user: { $in: userDocumentIds } });

        const deleteRequests = deleteRequestDocuments.map(deleteRequestDocument => {
            const { _id, user, createdAt } = deleteRequestDocument;
            const { nisn, name } = studentDocuments.find(studentDocument => studentDocument.user.equals(user));
            return { _id, nisn, name, createdAt };
        });

        res.json({ success: true, deleteRequests });
    } catch (error) {
        next(error);
    };
});

router.post('/:id/reject', async (req, res, next) => {
    const deleteRequestDocumentId = req.params.id;
    const { rejectedReason } = req.body;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const deleteRequestDocument = await DeleteRequest.findById(deleteRequestDocumentId);
        if (!deleteRequestDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Permintaan tidak ditemukan.' });
        };

        const { user: userDocumentId, status } = deleteRequestDocument;
        if (status !== 'pending') {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Permintaan sudah diproses.' });
        };

        await User.updateOne({ _id: userDocumentId }, { accountStatus: 'active' }, { session });
        await deleteRequestDocument.deleteOne({ session });
        await Notification.create([{ user: userDocumentId, type: 'info', message: `Permintaan penghapusan akun Anda ditolak oleh admin dengan alasan: ${rejectedReason}.` }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: 'Permintaan penghapusan ditolak.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

router.post('/:id/approve', async (req, res, next) => {
    const deleteRequestDocumentId = req.params.id;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const deleteRequestDocument = await DeleteRequest.findById(deleteRequestDocumentId);
        if (!deleteRequestDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Permintaan tidak ditemukan.' });
        };

        const { user: userDocumentId, status } = deleteRequestDocument;
        if (status !== 'pending') {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Permintaan sudah diproses.' });
        };

        deleteRequestDocument.status = 'approved';
        await deleteRequestDocument.save({ session });
        await Notification.create([{ user: userDocumentId, type: 'delete_account_approved', message: 'Permintaan penghapusan akun Anda telah disetujui oleh admin.' }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: 'Permintaan penghapusan disetujui.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

module.exports = router;
