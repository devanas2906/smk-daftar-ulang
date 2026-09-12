const express = require('express');
const School = require('../../models/school.js');

const router = express.Router();

// Get full school profiles
router.get('/profile', async (req, res, next) => {
    try {
        const schools = await School.findOne({}).select('schoolName schoolAddress schoolEmail schoolNumberPhone principalName treasurerName');
        res.json({ success: true, schools });
    } catch (error) {
        next(error);
    };
});

module.exports = router;