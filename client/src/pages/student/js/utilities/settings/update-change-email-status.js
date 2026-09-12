import * as api from "../../student-api.js";
import { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem } from "../../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../../common/js/resend-otp-timer.js";

export const updateChangeEmailStatus = async () => {
    const email = getSessionStorageItem('otp-change-email-email') || "";
    const { otpStatus, nextOtpAttemptTime } = await api.changeEmailOtpStatus({ email });

    if (otpStatus) {
        if (otpStatus === "verify-otp") applyOtpAttemptTime(null, null, nextOtpAttemptTime);
        setSessionStorageItem("otp-change-email-status", otpStatus);
    } else {
        removeSessionStorageItem("otp-change-email-status");
        removeSessionStorageItem("otp-change-email-email");
    };

    return { isExistOtp: !!otpStatus };
};