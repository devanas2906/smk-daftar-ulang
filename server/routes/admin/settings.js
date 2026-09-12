const express = require('express');

const User = require('../../models/user.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { hashPassword, verifyPassword } = require('../../utilities/auth.js');

const router = express.Router();

router.put('/me', validateBody(schemas.updateUser), async (req, res, next) => {
    const userDocumentId = req.user._id;

    const { email, currentPassword, password } = req.body;
    const updateUserPayload = { email };

    try {
        if (currentPassword && password) {
            const userDocument = await User.findOne(userDocumentId);
            const { password: currentPasswordHash } = userDocument;

            const isValidPassword = await verifyPassword(currentPasswordHash, currentPassword);
            if (!isValidPassword) return res.status(400).json({ success: false, message: "Password saat ini salah" });

            const hashedPassword = await hashPassword(password);
            updateUserPayload.password = hashedPassword;
        };

        const updateUserDocument = await User.findOneAndUpdate(userDocumentId, updateUserPayload, { new: true }).select('email');

        res.status(200).json({ success: true, message: "Data akun berhasil diperbarui.", newUserData: updateUserDocument });
    } catch (error) {
        next(error);
    };

});

module.exports = router;