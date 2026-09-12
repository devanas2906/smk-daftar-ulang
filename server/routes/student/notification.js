const express = require('express');

const User = require('../../models/user.js');
const Notification = require('../../models/notification.js');
const DeleteRequest = require('../../models/delete-request.js');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

const router = express.Router();

// Notifications
router.get('/', async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const notifications = await Notification.find({ user: userDocumentId }).sort({ createdAt: -1 });
        res.json({ success: true, notifications });
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', async (req, res, next) => {
    const userDocumentId = req.user._id;
    const notificationDocumentId = req.params.id;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const notificationDocument = await Notification.findOne({ _id: notificationDocumentId, user: userDocumentId });
        if (!notificationDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Notifikasi tidak ditemukan.' });
        }

        if (notificationDocument.type === "delete_account_approved") {
            await DeleteRequest.deleteOne({ user: userDocumentId }, { session });
            await User.updateOne({ _id: userDocumentId }, { accountStatus: "active" }, { session });
        };

        await notificationDocument.deleteOne({ session });
        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: 'Notifikasi berhasil dihapus.' });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

module.exports = router;