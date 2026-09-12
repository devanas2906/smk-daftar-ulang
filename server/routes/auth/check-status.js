const express = require('express');

const User = require('../../models/user.js');
const { verifyToken } = require('../../middlewares/auth-middleware.js');

const router = express.Router();

router.get('/check-status', verifyToken, async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const { role } = await User.findById(userDocumentId);
        res.json({ success: true, role });
    } catch (error) {
        next(error);
    };
});

router.get('/check-default-password', verifyToken, async (req, res, next) => {
    const userDocumentId = req.user._id;

    try {
        const { isDefaultPassword } = await User.findById(userDocumentId);
        res.json({ success: true, isDefaultPassword });
    } catch (error) {
        next(error);
    };
});

module.exports = router;
