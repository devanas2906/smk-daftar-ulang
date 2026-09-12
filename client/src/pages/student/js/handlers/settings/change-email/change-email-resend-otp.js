import * as api from "../../../student-api.js";
import { getSessionStorageItem } from "../../../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../../../common/js/resend-otp-timer.js";
import { applySweetalert2Message } from "../../../../../../common/js/utilities/sweetalert2.js";

export const handleChangeEmailResendOtp = () => {
    document.body.addEventListener('click', async function (event) {
        const changeEmailResendOtpButton = event.target.closest('.change-email-resend-otp-button');

        if (changeEmailResendOtpButton) {
            const email = getSessionStorageItem('otp-change-email-email');
            const changeEmailResendOtpTimer = this.querySelector('.change-email-resend-otp-timer');
            const originalChangeEmailResendOtpButtonText = changeEmailResendOtpButton.textContent;

            changeEmailResendOtpButton.textContent = "Mengirim kode...";

            try {
                const { nextOtpAttemptTime, message } = await api.changeEmailResendOtp({ email });

                applyOtpAttemptTime(changeEmailResendOtpTimer, changeEmailResendOtpButton, nextOtpAttemptTime);
                applySweetalert2Message("success", "Berhasil", message);
            } catch (error) {
                applySweetalert2Message("error", "Gagal", error.message);
            } finally {
                changeEmailResendOtpButton.textContent = originalChangeEmailResendOtpButtonText;
            };
        };

    });
};