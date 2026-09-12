import validator from "validator";

import { renderChangePasswordModal } from "../renders/render-change-password-modal.js";

import { apiFetch } from "../../../../common/js/api-utils.js";
import { redirectByRole, setLocalStorageItem } from "../../../../common/js/auth.js";

import { updateButtonState } from "../../../../common/js/button-state-utils.js";

import { applySweetalert2Message } from "../../../../common/js/utilities/sweetalert2.js";

export const handleLoginSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const loginForm = event.target.closest('.login-form');

        if (loginForm) {
            event.preventDefault();

            const loginSubmitButton = loginForm.querySelector('.login-submit-button');

            const email = loginForm.querySelector('#email').value.trim();
            const password = loginForm.querySelector('#password').value;

            const isValidEmail = validator.isEmail(email);
            const isValidPassword = validator.isLength(password, { min: 8, max: 12 });

            if (!isValidEmail) return applySweetalert2Message('error', 'Gagal', 'Format email tidak valid.');
            if (!isValidPassword) return applySweetalert2Message('error', 'Gagal', 'Password minimal 8 karakter & maksimal 12 karakter.');

            updateButtonState(loginSubmitButton, true);

            try {
                const { token, forceChangePassword, role } = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
                setLocalStorageItem("token", token);

                if (forceChangePassword) {
                    renderChangePasswordModal();
                    return;
                };

                redirectByRole(role);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(loginSubmitButton, false);
            };
        };
    });
};