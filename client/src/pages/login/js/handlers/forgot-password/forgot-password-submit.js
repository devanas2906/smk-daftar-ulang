import validator from "validator";

import { apiFetch } from "../../../../../common/js/api-utils.js";
import { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem } from "../../../../../common/js/auth.js";

import { renderForgotPasswordModal } from "../../renders/render-forgot-password-modal.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";
import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

const handleForgotPasswordSendOtpSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const forgotPasswordSendOtpForm = event.target.closest('.forgot-password-send-otp-form');

        if (forgotPasswordSendOtpForm) {
            event.preventDefault();

            const forgotPasswordSendOtpSubmitButton = forgotPasswordSendOtpForm.querySelector('.forgot-password-send-otp-submit-button');
            const email = forgotPasswordSendOtpForm.querySelector('#email').value.trim();

            const isValidEmail = validator.isEmail(email);
            if (!isValidEmail) return applySweetalert2Message("warning", "Periksa Kembali", "Foramt email tidak valid");

            updateButtonState(forgotPasswordSendOtpSubmitButton, true);

            try {
                const { otpStatus, otpEmail, message } = await apiFetch('/auth/forgot-password/otp/send', { method: 'POST', body: JSON.stringify({ email }) });

                setSessionStorageItem("otp-forgot-password-status", otpStatus);
                setSessionStorageItem("otp-forgot-password-email", otpEmail);

                renderForgotPasswordModal();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(forgotPasswordSendOtpSubmitButton, false);
            };
        };
    });
};

const handleForgotPasswordOtpVerificationSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const forgotPasswordOtpVerificationForm = event.target.closest('.forgot-password-otp-verification-form');

        if (forgotPasswordOtpVerificationForm) {
            event.preventDefault();

            const forgotPasswordOtpVerificationSubmitButton = forgotPasswordOtpVerificationForm.querySelector('.forgot-password-otp-verification-submit-button');
            const forgotPasswordOtpVerificationInputs = forgotPasswordOtpVerificationForm.querySelectorAll('.forgot-password-otp-verification-input');

            const isFullOtpCode = [...forgotPasswordOtpVerificationInputs].every(forgotPasswordOtpVerificationInput => forgotPasswordOtpVerificationInput.value);
            if (!isFullOtpCode) return applySweetalert2Message("warning", "Perhatikan Kembali", 'Kode OTP harus dimasukan semua');

            const email = getSessionStorageItem('otp-forgot-password-email');
            const otpCode = [...forgotPasswordOtpVerificationInputs].map(forgotPasswordOtpVerificationInput => forgotPasswordOtpVerificationInput.value).join("");

            updateButtonState(forgotPasswordOtpVerificationSubmitButton, true);

            try {
                const { otpStatus, otpEmail, forgotPasswordToken, message } = await apiFetch('/auth/forgot-password/otp/verify', { method: 'POST', body: JSON.stringify({ email, otpCode }) });

                setSessionStorageItem("otp-forgot-password-status", otpStatus);
                setSessionStorageItem("otp-forgot-password-email", otpEmail);
                setSessionStorageItem("forgot-password-token", forgotPasswordToken);

                renderForgotPasswordModal();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(forgotPasswordOtpVerificationSubmitButton, false);
            };
        };
    });
};

const handleForgotChangePasswordSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const forgotChangePasswordForm = event.target.closest('.forgot-change-password-form');

        if (forgotChangePasswordForm) {
            event.preventDefault();

            const forgotChangePasswordModal = forgotChangePasswordForm.closest('.forgot-change-password-modal-overlay');
            const forgotChangePasswordSubmitButton = forgotChangePasswordForm.querySelector('.forgot-change-password-submit-button');

            const forgotPasswordToken = getSessionStorageItem("forgot-password-token");
            const email = getSessionStorageItem("otp-forgot-password-email");
            const password = forgotChangePasswordForm.querySelector('#password').value.trim();

            const isValidPassword = validator.isLength(password, { min: 8, max: 12 });
            if (!isValidPassword) return applySweetalert2Message('warning', 'Periksa Kembali', 'Password minimal 8 karakter & maksimal 12 karakter.');

            updateButtonState(forgotChangePasswordSubmitButton, true);

            try {
                const { message } = await apiFetch('/auth/forgot-password/change', { method: 'POST', body: JSON.stringify({ forgotPasswordToken, email, password }) });

                removeSessionStorageItem("otp-forgot-password-status");
                removeSessionStorageItem("otp-forgot-password-email");
                removeSessionStorageItem("forgot-password-token");

                forgotChangePasswordModal?.remove();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(forgotChangePasswordSubmitButton, false);
            };
        };
    });
};

export const initializeForgotPasswordSubmits = () => {
    handleForgotPasswordSendOtpSubmit();
    handleForgotPasswordOtpVerificationSubmit();
    handleForgotChangePasswordSubmit();
};
