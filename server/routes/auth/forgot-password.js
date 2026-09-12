const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const { redis } = require('../../config/redis.js');
const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { handleStatusOtp, handleSendOtp, handleVerifyOtp, handleResendOtp } = require('../../utilities/otp/handlers.js');
const { hashPassword } = require('../../utilities/auth.js');

const purposeOtp = "forgot-password";

router.post('/otp/status', validateBody(schemas.otpStatus), async (req, res, next) => {
    const { email } = req.body;

    try {
        const { success, statusCode, otpStatus, nextOtpAttemptTime } = await handleStatusOtp(purposeOtp, email);
        res.status(statusCode).json({ success, otpStatus, nextOtpAttemptTime });
    } catch (error) {
        next(error);
    };
});

router.post('/otp/send', validateBody(schemas.sendOtp), async (req, res, next) => {
    const { email } = req.body;

    try {
        const { success, statusCode, message, otpStatus, otpEmail } = await handleSendOtp(purposeOtp, email);
        if (!success) return res.status(statusCode).json({ success, message });

        res.status(statusCode).json({ success, otpStatus, otpEmail, message });
    } catch (error) {
        next(error);
    };
});

router.post('/otp/verify', validateBody(schemas.otpVerify), async (req, res, next) => {
    const { email, otpCode } = req.body;
    const tokenLabel = "forgotPasswordToken";

    try {
        const { success, statusCode, message, otpStatus, otpEmail, token } = await handleVerifyOtp(purposeOtp, email, otpCode, tokenLabel);
        if (!success) return res.status(statusCode).json({ success, message });

        res.status(statusCode).json({ success, otpStatus, otpEmail, [tokenLabel]: token, message });
    } catch (error) {
        next(error);
    };
});

router.post('/otp/resend', validateBody(schemas.sendOtp), async (req, res, next) => {
    const { email } = req.body;

    try {
        const { success, statusCode, message, nextOtpAttemptTime } = await handleResendOtp(purposeOtp, email);
        if (!success) return res.status(statusCode).json({ success, message });

        res.status(statusCode).json({ success, nextOtpAttemptTime, message });
    } catch (error) {
        next(error);
    };
});

router.post('/change', validateBody(schemas.forgotChangePassword), async (req, res, next) => {
    const { forgotPasswordToken: currentForgotPasswordToken, email, password } = req.body;

    try {
        const verifiedCachedData = await redis.get(`verified-otp:${purposeOtp}:${email}`);
        if (!verifiedCachedData) return res.status(410).json({ success: false, message: "Kode OTP tidak valid atau sudah kedaluwarsa" });

        const { forgotPasswordToken: savedForgotPasswordToken } = verifiedCachedData;
        if (currentForgotPasswordToken !== savedForgotPasswordToken) return res.status(400).json({ success: false, message: "Token registrasi tidak valid" });

        const hashedPassword = await hashPassword(password);
        await User.updateOne({ email }, { password: hashedPassword });

        await redis.del(`verified-otp:${purposeOtp}:${email}`);

        res.status(200).json({ success: true, message: "Berhasil mengubah password akun Anda." });
    } catch (error) {
        next(error);
    };
});

module.exports = router;