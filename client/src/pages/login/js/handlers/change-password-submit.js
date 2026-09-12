import validator from "validator";

import { apiFetch } from "../../../../common/js/api-utils.js";
import { redirectByRole } from "../../../../common/js/auth.js";

import { updateButtonState } from "../../../../common/js/button-state-utils.js";

import { applySweetalert2Message } from "../../../../common/js/utilities/sweetalert2.js";

export const handleChangePasswordSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const changePasswordForm = event.target.closest('.change-password-form');

        if (changePasswordForm) {
            event.preventDefault();

            const changePasswordSubmitButton = changePasswordForm.querySelector('.change-password-submit-button');

            const newPassword = changePasswordForm.querySelector('#new-password').value;
            const isValidPassword = validator.isLength(newPassword, { min: 8, max: 12 });

            if (!isValidPassword) return applySweetalert2Message('warning', 'Periksa Kembali', 'Password minimal 8 karakter & maksimal 12 karakter.');

            updateButtonState(changePasswordSubmitButton, true);

            try {
                const { message, role } = await apiFetch('/auth/change-password', { method: 'POST', body: JSON.stringify({ newPassword }) });

                await applySweetalert2Message('success', 'Berhasil', message);
                redirectByRole(role);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(changePasswordSubmitButton, false);
            };

        };
    });
};