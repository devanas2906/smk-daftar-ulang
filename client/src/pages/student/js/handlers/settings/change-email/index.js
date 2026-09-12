import { handleChangeEmailOtpVerificationSubmit } from "./change-email-otp-verification.js";
import { handleChangeEmailResendOtp } from "./change-email-resend-otp.js";

import { initializeOtpVerificationInputHandlers } from "../../../../../../common/js/otp-verification-input-handler.js";

export const initializeChangeEmailHandlers = () => {
    handleChangeEmailOtpVerificationSubmit();
    handleChangeEmailResendOtp();

    initializeOtpVerificationInputHandlers();
};