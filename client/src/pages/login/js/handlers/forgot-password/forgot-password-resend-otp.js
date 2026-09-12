import { apiFetch } from "../../../../../common/js/api-utils.js";
import { getSessionStorageItem } from "../../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../../common/js/resend-otp-timer.js";

import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleForgotPasswordResendOtp = () => {
    document.body.addEventListener('click', async function (event) {
        const forgotPasswordResendOtpButton = event.target.closest('.forgot-password-resend-otp-button');

        if (forgotPasswordResendOtpButton) {
            const email = getSessionStorageItem('otp-forgot-password-email');
            const forgotPasswordResendOtpTimer = this.querySelector('.forgot-password-resend-otp-timer');
            const originalForgotPasswordResendOtpButtonText = forgotPasswordResendOtpButton.textContent;

            forgotPasswordResendOtpButton.textContent = "Mengirim kode...";

            try {
                const { nextOtpAttemptTime, message } = await apiFetch(`/auth/forgot-password/otp/resend`, { method: "POST", body: JSON.stringify({ email }) });

                applyOtpAttemptTime(forgotPasswordResendOtpTimer, forgotPasswordResendOtpButton, nextOtpAttemptTime);
                applySweetalert2Message("success", "Berhasil", message);
            } catch (error) {
                applySweetalert2Message("error", "Gagal", error.message);
            } finally {
                forgotPasswordResendOtpButton.textContent = originalForgotPasswordResendOtpButtonText;
            };
        };

    });
};