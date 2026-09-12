const express = require('express');
const router = express.Router();

const Student = require('../../models/student.js');

const Major = require('../../models/major.js');
const Batch = require('../../models/batch.js');
const Class = require('../../models/class.js');

const ReRegistration = require('../../models/reregistration.js');
const DeleteRequest = require('../../models/delete-request.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');

const masterConfig = {
    major: { model: Major, label: "jurusan" },
    batch: { model: Batch, label: "angkatan" },
    class: { model: Class, label: "kelas" }
};

router.get('/:type', async (req, res, next) => {
    const modelType = req.params.type;
    const Model = masterConfig[modelType].model;
    if (!Model) return res.status(400).json({ success: false, message: 'Tipe master data tidak dikenal.' });

    try {
        const masterData = await Model.find().sort({ createdAt: -1 });
        res.json({ success: true, masterData });
    } catch (error) {
        next(error);
    };
});

router.post('/:type', validateBody(schemas.masterData), async (req, res, next) => {
    const modelType = req.params.type;
    const { model: Model, label: modelLabel } = masterConfig[modelType] || {};

    if (!Model) return res.status(400).json({ success: false, message: 'Tipe master data tidak dikenal.' });

    try {
        await Model.create(req.body);
        res.status(201).json({ success: true, message: `Data ${modelLabel} berhasil disimpan.` });
    } catch (error) {
        if (error.code === 11000) {
            const { keyValue } = error;
            const valueProperty = Object.values(keyValue)[0];
            return res.status(400).json({ success: false, message: `Data ${valueProperty} sudah ada, tidak bisa menambahkan data baru` });
        };

        next(error);
    };
});

router.put('/:type/:id', validateBody(schemas.masterData), async (req, res, next) => {
    const { type: modelType, id: modelId } = req.params;
    const { model: Model, label: modelLabel } = masterConfig[modelType] || {};

    if (!Model) return res.status(400).json({ success: false, message: 'Tipe master data tidak dikenal.' });

    try {
        await Model.updateOne({ _id: modelId }, req.body);
        res.json({ success: true, message: `Data ${modelLabel} berhasil diperbarui.` });
    } catch (error) {
        if (error.code === 11000) {
            const { keyValue } = error;
            const valueProperty = Object.values(keyValue)[0];
            return res.status(400).json({ success: false, message: `Data ${valueProperty} sudah ada, tidak bisa memperbarui data` });
        };

        next(error);
    };
});

router.delete('/:type/:id', async (req, res, next) => {
    const { type: modelType, id: modelId } = req.params;
    const { model: Model, label: modelLabel } = masterConfig[modelType] || {};

    if (!Model) return res.status(400).json({ success: false, message: 'Tipe master data tidak dikenal.' });

    try {
        const filteredStudentDocuments = await Student.find({ [modelType]: modelId })
            .populate({
                path: "user",
                match: { accountStatus: { $in: ['active', 'pending_verification'] } }
            });

        const activeStudents = filteredStudentDocuments.filter(filteredStudentDocument => filteredStudentDocument.user !== null).length;
        if (activeStudents > 0) return res.status(400).json({ success: false, message: 'Tidak dapat menghapus data ini karena masih ada siswa aktif yang terhubung atau masih melakukan pendaftaran.' });

        const studentIds = await Student.find({ [modelType]: modelId }).distinct('_id');
        const processReRegistrations = await ReRegistration.countDocuments({
            student: { $in: studentIds },
            status: { $in: ['pending_verification', 'pending', 'revision'] }
        });

        if (processReRegistrations > 0) return res.status(400).json({ success: false, message: 'Tidak dapat menghapus data ini karena ada pengajuan daftar ulang yang masih dalam tahap proses.' });

        const userIds = await Student.find({ [modelType]: modelId }).distinct('user');

        const pendingDeleteRequests = await DeleteRequest.countDocuments({
            user: { $in: userIds },
            status: 'pending'
        });

        if (pendingDeleteRequests > 0) return res.status(400).json({ success: false, message: 'Tidak dapat menghapus data ini karena ada permintaan penghapusan akun yang masih menunggu.' });

        await Model.findByIdAndDelete(modelId);
        res.json({ success: true, message: `Data ${modelLabel} berhasil dihapus.` });
    } catch (error) {
        next(error);
    };
});

module.exports = router;