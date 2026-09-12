const express = require('express');
const School = require('../../models/school.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');

const router = express.Router();

router.put('/', validateBody(schemas.updateSchool), async (req, res, next) => {
    const updateSchoolPayload = req.body;

    try {
        await School.updateOne({}, updateSchoolPayload);
        res.status(200).json({ success: true, message: "Pembaruan data sekolah berhasil diperbarui." });
    } catch (error) {
        next(error);
    };
});

module.exports = router;