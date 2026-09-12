const { redis } = require('../../config/redis.js');
const { validateEmailExist, generateOtpCode, generateToken, validationBeforeSendOtp, sendOtpCode, setOtpRateLimit, maxAttemptOtpCode } = require('./helpers.js');

const handleStatusOtp = async (purposeOtp, email) => {
    let otpStatus = "";

    const verifyCachedData = await redis.get(`verify-otp:${purposeOtp}:${email}`);
    const verifiedCachedData = await redis.get(`verified-otp:${purposeOtp}:${email}`);

    const { nextOtpAttemptTime = 0 } = verifyCachedData || {};

    if (verifyCachedData) {
        otpStatus = "verify-otp";
    } else if (verifiedCachedData) {
        otpStatus = "verified-otp";
    };

    return { success: true, statusCode: 200, otpStatus, nextOtpAttemptTime };
};

const handleSendOtp = async (purposeOtp, email) => {
    const { isValid, statusCode, message } = await validationBeforeSendOtp(purposeOtp, "send", email);
    if (!isValid) return { success: false, statusCode, message };

    const isEmailExist = await validateEmailExist(email);

    if (isEmailExist) {
        const otpCode = generateOtpCode();
        const { attemptResendOtpCode } = await setOtpRateLimit(purposeOtp, email);

        await sendOtpCode(purposeOtp, email, otpCode);
        await redis.set(`verify-otp:${purposeOtp}:${email}`, { otpCachedCode: parseInt(otpCode), attemptOtpCode: 0, typeOtp: "send" }, { ex: 300 });
        await redis.set(`ratelimit:${purposeOtp}:${email}`, { attemptResendOtpCode }, { ex: 900 });
    };

    return { success: true, statusCode: 200, otpStatus: "verify-otp", otpEmail: email, message: "Berhasil mengirim permintaan kode OTP. Silakan cek email Anda." };
};

const handleVerifyOtp = async (purposeOtp, email, otpCode, tokenLabel) => {
    const normalizeOtpCode = parseInt(otpCode);

    const verifyCachedData = await redis.get(`verify-otp:${purposeOtp}:${email}`);
    if (!verifyCachedData) return { success: false, statusCode: 410, message: "Kode OTP tidak valid atau sudah kedaluwarsa, silakan minta kode OTP baru." };

    const { otpCachedCode } = verifyCachedData;
    const token = generateToken();

    if (normalizeOtpCode !== otpCachedCode) {
        verifyCachedData.attemptOtpCode += 1;

        const { attemptOtpCode } = verifyCachedData;

        if (attemptOtpCode >= maxAttemptOtpCode) {
            await redis.del(`verify-otp:${purposeOtp}:${email}`);
            return { success: false, statusCode: 429, message: "Percobaan sudah habis, silakan minta kode OTP baru." };
        };

        await redis.set(`verify-otp:${purposeOtp}:${email}`, verifyCachedData, { keepTtl: true });
        return { success: false, statusCode: 400, message: `Kode OTP salah, percobaan tinggal ${maxAttemptOtpCode - attemptOtpCode}` };
    };

    await redis.del(`verify-otp:${purposeOtp}:${email}`);
    await redis.del(`ratelimit:${purposeOtp}:${email}`);

    if (purposeOtp !== "change-email") await redis.set(`verified-otp:${purposeOtp}:${email}`, { [tokenLabel]: token }, { ex: 900 });

    return { success: true, statusCode: 200, otpStatus: "verified-otp", otpEmail: email, token, message: "Berhasil memverifikasi kode OTP Benar." };
};

const handleResendOtp = async (purposeOtp, email) => {
    const { isValid, statusCode, message } = await validationBeforeSendOtp(purposeOtp, "resend", email);
    if (!isValid) return { success: false, statusCode, message };

    const isEmailExist = await validateEmailExist(email);
    const currentDate = new Date();
    const nextOtpAttemptTime = currentDate.setMinutes(currentDate.getMinutes() + 1);

    if (isEmailExist) {
        const otpCode = generateOtpCode();
        const { attemptResendOtpCode } = await setOtpRateLimit(purposeOtp, email);

        await sendOtpCode(purposeOtp, email, otpCode);
        await redis.set(`verify-otp:${purposeOtp}:${email}`, { otpCachedCode: parseInt(otpCode), attemptOtpCode: 0, typeOtp: "resend", nextOtpAttemptTime }, { ex: 300 });
        await redis.set(`ratelimit:${purposeOtp}:${email}`, { attemptResendOtpCode }, { ex: 900 });
    };

    return { success: true, statusCode: 200, message: "Berhasil mengirim ulang permintaan kode OTP. Silakan cek email Anda.", nextOtpAttemptTime };
};

module.exports = { handleStatusOtp, handleSendOtp, handleVerifyOtp, handleResendOtp };