import { initializeRegisterOtpSubmits } from "./register-otp-submit.js";
import { initializeOtpVerificationInputHandlers } from "../../../../common/js/otp-verification-input-handler.js";
import { handleRegisterResendOtp } from "./register-resend-otp.js";

import { handleRegisterSubmit } from "./register-submit.js";
import { handleRegisterInputGroupControlByButton } from "./register-input-group-controls.js";

export const initializeRegisterHandlers = () => {
    initializeRegisterOtpSubmits();
    initializeOtpVerificationInputHandlers();
    handleRegisterResendOtp();

    handleRegisterSubmit();
    handleRegisterInputGroupControlByButton();
};