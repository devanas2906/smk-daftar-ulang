const express = require('express');
const User = require('../../models/user.js');

const router = express.Router();

// Get full profile
router.get('/profile', async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const admin = await User.findById(userDocumentId).select('-password');
        res.json({ success: true, admin });
    } catch (error) {
        next(error);
    };
});

module.exports = router;