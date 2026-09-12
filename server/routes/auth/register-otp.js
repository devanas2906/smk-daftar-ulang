const express = require('express');
const router = express.Router();

const { validateBody, schemas } = require('../../middlewares/validation-middleware.js');
const { handleStatusOtp, handleSendOtp, handleVerifyOtp, handleResendOtp } = require('../../utilities/otp/handlers.js');

const purposeOtp = "register";

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
    const tokenLabel = "registrationToken";

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

module.exports = router;