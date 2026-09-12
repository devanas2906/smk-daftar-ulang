import validator from "validator";

import { apiFetch } from "../../../../common/js/api-utils.js";
import { setSessionStorageItem, getSessionStorageItem } from "../../../../common/js/auth.js";

import { renderRegisterContent } from "../renders/render-register.js";

import { updateButtonState } from "../../../../common/js/button-state-utils.js";
import { applySweetalert2Message } from "../../../../common/js/utilities/sweetalert2.js";

const handleRegisterSendOtpSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const registerSendOtpForm = event.target.closest('.register-send-otp-form');

        if (registerSendOtpForm) {
            event.preventDefault();

            const registerSendOtpSubmitButton = registerSendOtpForm.querySelector('.register-send-otp-submit-button');
            const email = registerSendOtpForm.querySelector('#email').value.trim();

            const isValidEmail = validator.isEmail(email);
            if (!isValidEmail) return applySweetalert2Message("warning", "Periksa Kembali", "Foramt email tidak valid");

            updateButtonState(registerSendOtpSubmitButton, true);

            try {
                const { otpStatus, otpEmail, message } = await apiFetch('/auth/register/otp/send', { method: 'POST', body: JSON.stringify({ email }) });

                setSessionStorageItem("otp-register-status", otpStatus);
                setSessionStorageItem("otp-register-email", otpEmail);

                renderRegisterContent();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(registerSendOtpSubmitButton, false);
            };
        };
    });
};

const handleRegisterOtpVerificationSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const registerOtpVerificationForm = event.target.closest('.register-otp-verification-form');

        if (registerOtpVerificationForm) {
            event.preventDefault();

            const registerOtpVerificationSubmitButton = registerOtpVerificationForm.querySelector('.register-otp-verification-submit-button');
            const registerOtpVerificationInputs = registerOtpVerificationForm.querySelectorAll('.register-otp-verification-input');

            const isFullOtpCode = [...registerOtpVerificationInputs].every(registerOtpVerificationInput => registerOtpVerificationInput.value);
            if (!isFullOtpCode) return applySweetalert2Message("warning", "Perhatikan Kembali", 'Kode OTP harus dimasukan semua');

            const email = getSessionStorageItem('otp-register-email');
            const otpCode = [...registerOtpVerificationInputs].map(registerOtpVerificationInput => registerOtpVerificationInput.value).join("");

            updateButtonState(registerOtpVerificationSubmitButton, true);

            try {
                const { otpStatus, otpEmail, registrationToken, message } = await apiFetch('/auth/register/otp/verify', { method: 'POST', body: JSON.stringify({ email, otpCode }) });

                setSessionStorageItem("otp-register-status", otpStatus);
                setSessionStorageItem("otp-register-email", otpEmail);
                setSessionStorageItem("registration-token", registrationToken);

                renderRegisterContent();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(registerOtpVerificationSubmitButton, false);
            };
        };
    });
};

export const initializeRegisterOtpSubmits = () => {
    handleRegisterSendOtpSubmit();
    handleRegisterOtpVerificationSubmit();
};
