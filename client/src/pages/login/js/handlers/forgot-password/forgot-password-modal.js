import { renderForgotPasswordModal } from "../../renders/render-forgot-password-modal.js";

export const handleForgotPasswordModal = () => {
    document.body.addEventListener('click', async (event) => {
        const forgotPasswordButton = event.target.closest('.forgot-password-button');
        if (forgotPasswordButton) renderForgotPasswordModal();
    });
};