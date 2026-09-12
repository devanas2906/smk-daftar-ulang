import { getSessionStorageItem } from "../../../../common/js/auth.js";

import { createForgotPasswordSendOtpModal, createForgotPasswordOtpVerificationModal, createForgotChangePasswordModal } from "../components/forgot-password-modal.js";
import { updateForgotPasswordStatus } from "../utilities/update-forgot-password-status.js";

export const renderForgotPasswordModal = async () => {
    await updateForgotPasswordStatus();

    const otpForgotPasswordStatus = getSessionStorageItem("otp-forgot-password-status");
    const forgotPasswordModalOverlay = document.querySelector('.forgot-password-modal-overlay');
    forgotPasswordModalOverlay?.remove();

    switch (otpForgotPasswordStatus) {
        case "verified-otp": {
            const forgotChangePasswordModal = createForgotChangePasswordModal();
            document.body.appendChild(forgotChangePasswordModal);
            break;
        };
        case "verify-otp": {
            const forgotPasswordOtpVerificationModal = createForgotPasswordOtpVerificationModal();
            document.body.appendChild(forgotPasswordOtpVerificationModal);
            break;
        };
        default: {
            const forgotPasswordSendOtpModal = createForgotPasswordSendOtpModal();
            document.body.appendChild(forgotPasswordSendOtpModal);
        };
    };
};