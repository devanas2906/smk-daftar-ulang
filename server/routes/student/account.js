const express = require('express');

const User = require('../../models/user.js');
const Student = require('../../models/student.js');

const ReRegistration = require('../../models/reregistration.js');
const Notification = require('../../models/notification.js');
const DeleteRequest = require('../../models/delete-request.js');

const { deleteAsset } = require('../../config/cloudinary.js');
const { requireActiveAccount } = require('../../middlewares/auth-middleware.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

const router = express.Router();

// Get full profile with populated master data
router.get('/profile', async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const student = await Student.findOne({ user: userDocumentId })
            .populate('user', 'email')
            .populate('batch', 'entryYear')
            .populate('major', 'majorName majorCode')
            .populate('class', 'className');

        res.json({ success: true, student });
    } catch (error) {
        next(error);
    };
});

// Step 1 of self-deletion handshake: student requests account deletion
router.post('/request-delete', requireActiveAccount, async (req, res, next) => {
    const userDocumentId = req.user._id;
    const activeRequestDeleteList = [{ status: "pending", message: "Permintaan penghapusan sudah diajukan sebelumnya." }, { status: "approved", message: "Permintaan penghapusan sudah disetujui, silahkan lihat di notifikasi." }];

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const deleteRequestDocument = await DeleteRequest.findOne({ user: userDocumentId });
        if (deleteRequestDocument) {
            const { status: currentRequestDeleteStatus } = deleteRequestDocument;

            const findDeleteRequestInProgress = activeRequestDeleteList.find(activeRequestDeleteItem => activeRequestDeleteItem.status === currentRequestDeleteStatus);
            if (findDeleteRequestInProgress) {
                await mongooseTransaction.failedTransaction();
                return res.status(400).json({ success: false, message: findDeleteRequestInProgress.message });
            };
        };

        await DeleteRequest.create([{ user: userDocumentId }], { session });

        await mongooseTransaction.successTransaction();

        res.status(201).json({ success: true, message: 'Permintaan penghapusan akun berhasil diajukan ke admin.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

// Step 4 of self-deletion handshake: student executes final deletion after admin approval
router.delete('/execute-delete', requireActiveAccount, async (req, res, next) => {
    const userDocumentId = req.user._id;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const approvedRequest = await DeleteRequest.findOne({ user: userDocumentId, status: 'approved' });
        if (!approvedRequest) {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Penghapusan belum disetujui oleh admin.' });
        };

        const { _id: studentDocumentId } = await Student.findOne({ user: userDocumentId });
        const reRegistrationDocuments = await ReRegistration.find({ student: studentDocumentId });
        const documentPublicIds = reRegistrationDocuments.flatMap((reRegistrationDocument) => [reRegistrationDocument.kartuTandaPendudukPublicId, reRegistrationDocument.kartuKeluargaPublicId, reRegistrationDocument.ijazahSmpPublicId, reRegistrationDocument.buktiPembayaranPublicId]);

        await ReRegistration.deleteMany({ student: studentDocumentId }, { session });
        await Notification.deleteMany({ user: userDocumentId }, { session });
        await DeleteRequest.deleteMany({ user: userDocumentId }, { session });
        await Student.deleteMany({ user: userDocumentId }, { session });
        await User.deleteOne({ _id: userDocumentId }, { session });

        await mongooseTransaction.successTransaction();
        await Promise.all(documentPublicIds.map((documentPublicId) => deleteAsset(documentPublicId)));

        res.json({ success: true, message: 'Akun Anda telah berhasil dihapus secara permanen.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

module.exports = router;
