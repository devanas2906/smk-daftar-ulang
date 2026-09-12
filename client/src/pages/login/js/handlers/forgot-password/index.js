import { handleForgotPasswordModal } from "./forgot-password-modal.js";
import { handleForgotPasswordResendOtp } from "./forgot-password-resend-otp.js";

import { initializeForgotPasswordSubmits } from "./forgot-password-submit.js";
import { initializeOtpVerificationInputHandlers } from "../../../../../common/js/otp-verification-input-handler.js";

export const initializeForgotPasswordHandlers = () => {
    handleForgotPasswordModal();
    handleForgotPasswordResendOtp();

    initializeForgotPasswordSubmits();
    initializeOtpVerificationInputHandlers();
};