import { createChangePasswordModal } from "../components/change-password-modal.js";

export const renderChangePasswordModal = () => {
    const changePasswordModal = createChangePasswordModal();
    document.body.appendChild(changePasswordModal);
};