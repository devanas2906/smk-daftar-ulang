import validator from "validator";

import * as api from "../../admin-api.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";
import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminSettingsForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const adminDashboardSettingsForm = event.target.closest('.admin-dashboard-settings-management-form');

        if (adminDashboardSettingsForm) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const adminSettingSubmitButton = adminDashboardSettingsForm.querySelector('.settings-submit-button');

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

            updateButtonState(adminSettingSubmitButton, true);

            try {
                const { newUserData, message } = await api.updateAccountData(updateUserPayload);
                const { email } = newUserData;

                event.target.reset();
                emailInput.value = email;

                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(adminSettingSubmitButton, false);
            };

        };
    });
};