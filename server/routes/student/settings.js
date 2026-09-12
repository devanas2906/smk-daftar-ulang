const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { hashPassword, verifyPassword } = require('../../utilities/auth.js');
const { handleStatusOtp, handleSendOtp, handleVerifyOtp, handleResendOtp } = require('../../utilities/otp/handlers.js');

const purposeOtp = "change-email";

router.put('/me', validateBody(schemas.updateUser), async (req, res, next) => {
    const userDocumentId = req.user._id;
    const { email, currentPassword, password } = req.body;

    try {
        const existingUserDocument = await User.findOne({ email });
        const userDocument = await User.findOne(userDocumentId);

        const { email: currentEmail, password: currentPasswordHashed } = userDocument;

        const isDifferenceEmail = email !== currentEmail;
        const isSendOTP = isDifferenceEmail && !existingUserDocument;

        if (currentPassword && password) {
            const isValidPassword = await verifyPassword(currentPasswordHashed, currentPassword);
            if (!isValidPassword) return res.status(400).json({ success: false, message: "Password saat ini salah" });

            const hashedPassword = await hashPassword(password);
            const updateUserPayload = { password: hashedPassword };

            await User.updateOne({ _id: userDocumentId }, updateUserPayload);
        };

        // send OTP code
        if (isSendOTP) {
            const { success, statusCode, message, otpStatus, otpEmail } = await handleSendOtp(purposeOtp, email);
            if (!success) return res.status(statusCode).json({ success, message });

            return res.status(statusCode).json({ success, otpStatus, otpEmail, message });
        };

        res.status(200).json({ success: true, message: "Data akun berhasil diperbarui." });
    } catch (error) {
        next(error);
    };
});

router.post('/change-email/otp/status', validateBody(schemas.otpStatus), async (req, res, next) => {
    const { email } = req.body;

    try {
        const { success, statusCode, otpStatus, nextOtpAttemptTime } = await handleStatusOtp(purposeOtp, email);
        res.status(statusCode).json({ success, otpStatus, nextOtpAttemptTime });
    } catch (error) {
        next(error);
    };
});

router.post('/change-email/otp/verify', validateBody(schemas.otpVerify), async (req, res, next) => {
    const userDocumentId = req.user._id;
    const { email, otpCode } = req.body;

    try {
        const { success, statusCode, message } = await handleVerifyOtp(purposeOtp, email, otpCode, "");
        if (!success) return res.status(statusCode).json({ success, message });

        await User.updateOne({ _id: userDocumentId }, { email });

        res.status(statusCode).json({ success, message: "Berhasil mengganti alamat email akun Anda." });
    } catch (error) {
        next(error);
    };
});

router.post('/change-email/otp/resend', validateBody(schemas.sendOtp), async (req, res, next) => {
    const { email } = req.body;

    try {
        const { success, statusCode, message, nextOtpAttemptTime } = await handleResendOtp(purposeOtp, email);
        if (!success) return res.status(statusCode).json({ success, message });

        res.status(statusCode).json({ success, nextOtpAttemptTime, message });
    } catch (error) {
        next(error);
    };
});

module.exports = router;
