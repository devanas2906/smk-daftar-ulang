const express = require('express');
const router = express.Router();

const Major = require('../../models/major.js');
const Batch = require('../../models/batch.js');

router.get('/register-options', async (_, res, next) => {
    try {
        const activeBatch = await Batch.findOne().sort({ entryYear: -1 }).select('_id entryYear');
        const majors = await Major.find().select('_id majorName');

        res.json({ success: true, masterRegisterOptions: { activeBatch, majors } });
    } catch (error) {
        next(error);
    };
});

module.exports = router;