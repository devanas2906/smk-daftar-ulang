import { apiFetch } from "../../../../common/js/api-utils.js";
import { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem } from "../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../common/js/resend-otp-timer.js";

export const updateForgotPasswordStatus = async () => {
    const email = getSessionStorageItem('otp-forgot-password-email') || "";
    const { otpStatus, nextOtpAttemptTime } = await apiFetch('/auth/forgot-password/otp/status', { method: "POST", body: JSON.stringify({ email }) });

    if (otpStatus) {
        if (otpStatus === "verify-otp") applyOtpAttemptTime(null, null, nextOtpAttemptTime);
        setSessionStorageItem("otp-forgot-password-status", otpStatus);
    } else {
        removeSessionStorageItem("otp-forgot-password-status");
        removeSessionStorageItem("otp-forgot-password-email");
        removeSessionStorageItem("forgot-password-token");
    };
};