import { getSessionStorageItem } from "../../../../../common/js/auth.js";
import { createChangeEmailOtpVerificationModal } from "../../components/settings/student-change-email-modal.js";

export const renderChangeEmailModal = () => {
    const otpChangeEmailStatus = getSessionStorageItem("otp-change-email-status");
    const changeEmailModalOverlay = document.querySelector('.change-email-modal-overlay');
    changeEmailModalOverlay?.remove();

    switch (otpChangeEmailStatus) {
        case "verify-otp": {
            const changeEmailOtpVerificationModal = createChangeEmailOtpVerificationModal();
            document.body.appendChild(changeEmailOtpVerificationModal);
            break;
        };
    };
};