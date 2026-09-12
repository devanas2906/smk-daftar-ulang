import { apiFetch } from "../../../../common/js/api-utils.js";
import { getSessionStorageItem } from "../../../../common/js/auth.js";

import { applyOtpAttemptTime } from "../../../../common/js/resend-otp-timer.js";

import { applySweetalert2Message } from "../../../../common/js/utilities/sweetalert2.js";

export const handleRegisterResendOtp = () => {
    document.body.addEventListener('click', async function (event) {
        const registerResendOtpButton = event.target.closest('.register-resend-otp-button');

        if (registerResendOtpButton) {
            const email = getSessionStorageItem('otp-register-email');
            const registerResendOtpTimer = this.querySelector('.register-resend-otp-timer');
            const originalRegisterResendOtpButtonText = registerResendOtpButton.textContent;

            registerResendOtpButton.textContent = "Mengirim kode...";

            try {
                const { nextOtpAttemptTime, message } = await apiFetch(`/auth/register/otp/resend`, { method: "POST", body: JSON.stringify({ email }) });

                applyOtpAttemptTime(registerResendOtpTimer, registerResendOtpButton, nextOtpAttemptTime);
                applySweetalert2Message("success", "Berhasil", message);
            } catch (error) {
                applySweetalert2Message("error", "Gagal", error.message);
            } finally {
                registerResendOtpButton.textContent = originalRegisterResendOtpButtonText;
            };
        };

    });
};