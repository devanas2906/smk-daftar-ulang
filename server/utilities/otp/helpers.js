const { validate } = require('deep-email-validator');
const { Resend } = require('resend');

const otpGenerator = require('otp-generator');
const crypto = require('crypto');

const { redis } = require('../../config/redis.js');
const User = require('../../models/user.js');

const resend = new Resend(process.env.RESEND_API_KEY);
const maxAttemptOtpCode = 3;
const maxAttemptResendOtpCode = 3;

const validateEmailExist = async (email) => (await validate(email)).valid;
const generateOtpCode = () => otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
const generateToken = () => crypto.randomBytes(32).toString("hex");

const validationBeforeSendOtp = async (purposeOtp, otpAction, email) => {
    const ratelimitCachedData = await redis.get(`ratelimit:${purposeOtp}:${email}`);
    const verifyCachedData = await redis.get(`verify-otp:${purposeOtp}:${email}`);
    const verifiedCachedData = await redis.get(`verified-otp:${purposeOtp}:${email}`);

    const emailRegistrationPendingMessage = "Email ini sedang dalam proses registrasi, silakan cek email Anda atau tunggu beberapa saat.";
    const { attemptResendOtpCode } = ratelimitCachedData || {};

    if (ratelimitCachedData && attemptResendOtpCode >= maxAttemptResendOtpCode) return { isValid: false, statusCode: 429, message: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." };
    if ((verifyCachedData && otpAction === "send") || verifiedCachedData) return { isValid: false, statusCode: 409, message: emailRegistrationPendingMessage };

    if (verifyCachedData) {
        const { typeOtp, nextOtpAttemptTime } = verifyCachedData;
        const currentDate = Date.now();

        if (typeOtp === "resend" && nextOtpAttemptTime > currentDate) {
            const diffTime = nextOtpAttemptTime - currentDate;
            const minutes = Math.floor(diffTime % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(diffTime % (1000 * 60) / 1000);

            const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return { isValid: false, statusCode: 400, message: `Silakan tunggu ${`${formatMinutes}:${formatSeconds}`} lagi untuk mengirim ulang kode OTP.` };
        };
    };

    if (purposeOtp === "register") {
        const existingUserDocument = await User.findOne({ email });
        if (existingUserDocument) return { isValid: false, statusCode: 409, message: "Email sudah terdaftar." };
    };

    return { isValid: true };
};

const sendOtpCode = async (purposeOtp, email, otpCode) => {
    const sendOtpCodeData = {
        "register": {
            subject: `Pendaftaran Sekolah Kode Verifikasi Anda: ${otpCode}`,
            subTitle: "Terima kasih telah mendaftar sekolah. Gunakan kode di bawah ini untuk menyelesaikan pendaftaran Anda:"
        },
        "forgot-password": {
            subject: `Reset Password Kode Verifikasi Anda: ${otpCode}`,
            subTitle: "Kami menerima permintaan untuk mereset kata sandi akun Anda. Gunakan kode di bawah ini untuk melanjutkan:"
        },
        "change-email": {
            subject: `Perubahan Email Kode Verifikasi Anda: ${otpCode}`,
            subTitle: "Kami menerima permintaan untuk memperbarui alamat email akun Anda. Gunakan kode di bawah ini untuk mengonfirmasi email baru Anda:"
        },
    };

    await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `${sendOtpCodeData[purposeOtp].subject}`,
        html: `<div style="font-family: sans-serif; max-width: 400px; margin: auto;">
                      <h2>Verifikasi Email Anda</h2>
                      <p>${sendOtpCodeData[purposeOtp].subTitle}</p>

                      <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px;">
                         <h1 style="letter-spacing: 5px; color: #333; margin: 0;">${otpCode}</h1>
                      </div>

                      <p style="font-size: 12px; color: #666; margin-top: 20px;">Kode ini hanya berlaku selama <strong>5 menit</strong>. Demi keamanan, jangan bagikan kode ini kepada siapa pun termasuk pihak Sekolah.</p>
                      <hr style="border: none; border-top: 1px solid #eee;">
                      <p style="font-size: 11px; color: #999;">Jika Anda tidak merasa melakukan pendaftaran ini, abaikan email ini.</p>
                   </div>`
    });
};

const setOtpRateLimit = async (purposeOtp, email) => {
    const ratelimitCachedData = await redis.get(`ratelimit:${purposeOtp}:${email}`);
    let { attemptResendOtpCode = 1 } = ratelimitCachedData || {};
    if (ratelimitCachedData) attemptResendOtpCode++;

    return { attemptResendOtpCode };
};

module.exports = { validateEmailExist, generateOtpCode, generateToken, validationBeforeSendOtp, sendOtpCode, setOtpRateLimit, maxAttemptOtpCode };