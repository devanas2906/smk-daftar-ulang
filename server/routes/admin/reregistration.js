const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');
const Student = require('../../models/student.js');

const Class = require('../../models/class.js');

const ReRegistration = require('../../models/reregistration.js');
const Notification = require('../../models/notification.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware');
const { validateObjectId } = require('../../utilities/validation-object-id.js');
const { deleteAsset } = require('../../config/cloudinary');

const MongooseTransaction = require('../../utilities/mongoose-transaction.js');

router.get('/', async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : { status: { $nin: ["draft", "rejected"] } };

        const reRegistrationDocuments = await ReRegistration.find(filter)
            .populate(
                {
                    path: "student",
                    populate: "batch major class",
                }
            )
            .sort({ createdAt: -1 });

        res.json({ success: true, reRegistrations: reRegistrationDocuments });
    } catch (error) {
        next(error);
    };
});

router.post('/:id/approve', async (req, res, next) => {
    const reRegistrationDocumentId = req.params.id;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const reRegistrationDocument = await ReRegistration.findById(reRegistrationDocumentId).populate({ path: "student", populate: "user" });
        if (!reRegistrationDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Data berkas daftar ulang tidak ditemukan.' });
        };

        const { student: { user, name }, status: currentStatusReRegistration } = reRegistrationDocument;
        const { _id: userDocumentId, accountStatus } = user;

        const validUpdateStatusReRegistration = ["pending_verification", "pending"];
        if (!validUpdateStatusReRegistration.includes(currentStatusReRegistration)) {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Status berkas daftar ulang saat ini tidak dapat di-setujui.' });
        };

        reRegistrationDocument.status = 'approved';
        reRegistrationDocument.verificationDate = new Date();

        if (accountStatus === "pending_verification") {
            const { classValue } = req.query;
            const { isValidObjectId } = validateObjectId(classValue);

            if (!isValidObjectId) {
                await mongooseTransaction.failedTransaction();
                return res.status(400).json({ success: false, message: "Kelas tidak valid" });
            }

            const existingClassDocument = await Class.findById(classValue);

            if (!existingClassDocument) {
                await mongooseTransaction.failedTransaction();
                return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan.' });
            };

            await User.updateOne({ _id: userDocumentId }, { accountStatus: "active" }, { session });
            await Student.updateOne({ user: userDocumentId }, { class: classValue }, { session });
        };

        await reRegistrationDocument.save({ session });
        await Notification.create([{ user: userDocumentId, type: 'receipt', message: 'Selamat! Pengajuan daftar ulang Anda telah disetujui. Surat keterangan verifikasi berkas pendaftaran resmi telah tersedia.', metadata: {} }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: `Pengajuan daftar ulang ${name} telah disetujui.` });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

router.post('/:id/revision', validateBody(schemas.noteReRegistration), async (req, res, next) => {
    const reRegistrationDocumentId = req.params.id;
    const { note } = req.body;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const reRegistrationDocument = await ReRegistration.findById(reRegistrationDocumentId).populate({ path: "student", populate: "user" });
        if (!reRegistrationDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Data berkas daftar ulang tidak ditemukan.' });
        };

        const { student: { user, name }, status: currentStatusReRegistration } = reRegistrationDocument;
        const { _id: userDocumentId } = user;

        const validUpdateStatusReRegistration = ["pending_verification", "pending"];
        if (!validUpdateStatusReRegistration.includes(currentStatusReRegistration)) {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Status berkas daftar ulang saat ini tidak dapat di-revisi.' });
        };

        reRegistrationDocument.status = 'revision';
        reRegistrationDocument.note = note;

        await reRegistrationDocument.save({ session });
        await Notification.create([{ user: userDocumentId, type: 'info', message: `Pengajuan daftar ulang Anda perlu direvisi. Alasan: ${note}`, metadata: {} }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: `Pengajuan daftar ulang ${name} telah diminta untuk direvisi.` });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

router.post('/:id/reject', validateBody(schemas.noteReRegistration), async (req, res, next) => {
    const reRegistrationDocumentId = req.params.id;
    const { note } = req.body;

    const mongooseTransaction = new MongooseTransaction();
    const session = await mongooseTransaction.startTransaction();

    try {
        const reRegistrationDocument = await ReRegistration.findById(reRegistrationDocumentId).populate({ path: "student", populate: "user" });
        if (!reRegistrationDocument) {
            await mongooseTransaction.failedTransaction();
            return res.status(404).json({ success: false, message: 'Data berkas daftar ulang tidak ditemukan.' });
        };

        const { student: { user, name }, status: currentStatusReRegistration } = reRegistrationDocument;
        const { _id: userDocumentId } = user;

        const validUpdateStatusReRegistration = ["pending_verification"];
        if (!validUpdateStatusReRegistration.includes(currentStatusReRegistration)) {
            await mongooseTransaction.failedTransaction();
            return res.status(400).json({ success: false, message: 'Status berkas daftar ulang saat ini tidak dapat di-tolak.' });
        };

        const currentDate = new Date();
        const scheduledDeletionAt = currentDate.setDate(currentDate.getDate() + 3);

        reRegistrationDocument.status = 'rejected';
        reRegistrationDocument.note = note;

        await reRegistrationDocument.save({ session });
        await User.updateOne({ _id: userDocumentId }, { accountStatus: "rejected", scheduledDeletionAt }, { session });
        await Notification.create([{ user: userDocumentId, type: 'info', message: `Pengajuan daftar ulang Anda ditolak. Alasan: ${note}`, metadata: {} }], { session });

        await mongooseTransaction.successTransaction();

        res.json({ success: true, message: `Pengajuan daftar ulang ${name} telah ditolak.` });
    } catch (error) {
        await mongooseTransaction.failedTransaction();
        next(error);
    };
});

router.delete('/:id', async (req, res, next) => {
    const reRegistrationDocumentId = req.params.id;
    const inValidDeleteReRegistrationStatus = ["pending_verification", "pending", "revision"];

    try {
        const reRegistrationDocument = await ReRegistration.findById(reRegistrationDocumentId);
        if (!reRegistrationDocument) return res.status(404).json({ success: false, message: 'Data berkas daftar ulang tidak ditemukan.' });

        const {
            status,
            kartuTandaPendudukPublicId,
            kartuKeluargaPublicId,
            ijazahSmpPublicId,
            buktiPembayaranPublicId
        } = reRegistrationDocument;

        if (inValidDeleteReRegistrationStatus.includes(status)) return res.status(400).json({ success: false, message: 'Tidak dapat menghapus data berkas yang masih butuh peninjauan.' });

        await reRegistrationDocument.deleteOne();

        await Promise.all([
            deleteAsset(kartuTandaPendudukPublicId),
            deleteAsset(kartuKeluargaPublicId),
            deleteAsset(ijazahSmpPublicId),
            deleteAsset(buktiPembayaranPublicId)
        ]);

        res.json({ success: true, message: 'Berkas daftar ulang berhasil dihapus.' });
    } catch (error) {
        next(error);
    };
});

module.exports = router;
