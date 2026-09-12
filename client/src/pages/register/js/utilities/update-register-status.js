import { apiFetch } from "../../../../common/js/api-utils.js";
import { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem } from "../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../common/js/resend-otp-timer.js";

export const updateRegisterStatus = async () => {
    const email = getSessionStorageItem('otp-register-email') || "";
    const { otpStatus, nextOtpAttemptTime } = await apiFetch('/auth/register/otp/status', { method: "POST", body: JSON.stringify({ email }) });

    if (otpStatus) {
        if (otpStatus === "verify-otp") applyOtpAttemptTime(null, null, nextOtpAttemptTime);
        setSessionStorageItem("otp-register-status", otpStatus);
    } else {
        removeSessionStorageItem("otp-register-status");
        removeSessionStorageItem("otp-register-email");
        removeSessionStorageItem("registration-token");
    };
};