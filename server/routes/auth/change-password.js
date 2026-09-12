const express = require('express');

const User = require('../../models/user.js');
const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { verifyToken } = require('../../middlewares/auth-middleware.js');

const { hashPassword } = require('../../utilities/auth.js');

const router = express.Router();

router.post('/change-password', verifyToken, validateBody(schemas.changePassword), async (req, res, next) => {
    const userDocumentId = req.user._id;
    const { newPassword } = req.body;

    try {
        const { isDefaultPassword } = await User.findById(userDocumentId);
        if (!isDefaultPassword) return res.status(400).json({ success: false, message: "Password anda telah diubah, tidak bisa diubah lagi." });

        const hashedPassword = await hashPassword(newPassword);
        const { role } = await User.findByIdAndUpdate(userDocumentId, { password: hashedPassword, isDefaultPassword: false }, { new: true });

        res.json({ success: true, message: 'Password berhasil diperbarui.', role });
    } catch (error) {
        next(error);
    };
});

module.exports = router;
