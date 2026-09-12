import validator from "validator";

import * as api from "../../student-api.js";

import { setSessionStorageItem, getSessionStorageItem } from "../../../../../common/js/auth.js";
import { updateChangeEmailStatus } from "../../utilities/settings/update-change-email-status.js";
import { renderChangeEmailModal } from "../../renders/settings/render-change-email-modal.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";
import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentSettingsForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const studentDashboarSettingsForm = event.target.closest('.student-dashboard-settings-management-form');

        if (studentDashboarSettingsForm) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const studentSettingSubmitButton = studentDashboarSettingsForm.querySelector('.settings-submit-button');

            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();

            const currentPassword = document.getElementById('currentPassword').value.trim();
            const newPassword = document.getElementById('newPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();

            const emailError = document.getElementById('emailError');
            const currentPasswordError = document.getElementById('currentPasswordError');
            const newPasswordError = document.getElementById('newPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');

            emailError.textContent = '';
            currentPasswordError.textContent = '';
            newPasswordError.textContent = '';
            confirmPasswordError.textContent = '';

            const hasPasswordInputValue = currentPassword || newPassword || confirmPassword;

            const isValidEmail = validator.isEmail(email);
            const isValidCurrentPassword = validator.isLength(currentPassword, { min: 8, max: 12 });
            const isValidNewPassword = validator.isLength(newPassword, { min: 8, max: 12 });
            const isValidConfirmPassword = validator.isLength(confirmPassword, { min: 8, max: 12 });
            const isMatchPassword = confirmPassword === newPassword;

            if (!hasPasswordInputValue && !email) return;
            if (!isValidEmail) return emailError.textContent = 'Format email tidak valid.';

            if (hasPasswordInputValue && !isValidCurrentPassword) return currentPasswordError.textContent = 'Password saat ini minimal 8 karakter & maksimal 12 karakter.';
            if (hasPasswordInputValue && !isValidNewPassword) return newPasswordError.textContent = 'Password baru minimal 8 karakter & maksimal 12 karakter.';
            if (hasPasswordInputValue && !isValidConfirmPassword) return confirmPasswordError.textContent = 'Konfirmasi password minimal 8 karakter & maksimal 12 karakter.';
            if (hasPasswordInputValue && !isMatchPassword) return confirmPasswordError.textContent = 'Konfirmasi password tidak sama.';

            const updateUserPayload = { email, currentPassword: currentPassword, password: confirmPassword };
            updateButtonState(studentSettingSubmitButton, true);

            try {
                const { isExistOtp } = await updateChangeEmailStatus();

                if (isExistOtp) {
                    const savedEmail = getSessionStorageItem("otp-change-email-email");
                    emailInput.value = savedEmail;

                    return renderChangeEmailModal();
                };

                const { otpStatus, otpEmail, message } = await api.updateStudentPassword(updateUserPayload);

                event.target.reset();
                applySweetalert2Message('success', 'Berhasil', message);

                if (otpStatus && otpEmail) {
                    emailInput.value = otpEmail;

                    setSessionStorageItem("otp-change-email-status", otpStatus);
                    setSessionStorageItem("otp-change-email-email", otpEmail);
                    renderChangeEmailModal();
                };

            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(studentSettingSubmitButton, false);
            };

        };
    });
};