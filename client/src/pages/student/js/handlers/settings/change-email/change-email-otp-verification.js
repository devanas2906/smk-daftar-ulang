import * as api from "../../../student-api.js";

import { getSessionStorageItem, removeSessionStorageItem } from "../../../../../../common/js/auth.js";

import { updateButtonState } from "../../../../../../common/js/button-state-utils.js";
import { applySweetalert2Message } from "../../../../../../common/js/utilities/sweetalert2.js";

export const handleChangeEmailOtpVerificationSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const changeEmailOtpVerificationForm = event.target.closest('.change-email-otp-verification-form');

        if (changeEmailOtpVerificationForm) {
            event.preventDefault();

            const changeEmailOtpVerificationModal = changeEmailOtpVerificationForm.closest('.change-email-otp-verification-modal-overlay');
            const changeEmailOtpVerificationSubmitButton = changeEmailOtpVerificationForm.querySelector('.change-email-otp-verification-submit-button');
            const changeEmailOtpVerificationInputs = changeEmailOtpVerificationForm.querySelectorAll('.change-email-otp-verification-input');

            const isFullOtpCode = [...changeEmailOtpVerificationInputs].every(changeEmailOtpVerificationInput => changeEmailOtpVerificationInput.value);
            if (!isFullOtpCode) return applySweetalert2Message("warning", "Perhatikan Kembali", 'Kode OTP harus dimasukan semua');

            const email = getSessionStorageItem('otp-change-email-email');
            const otpCode = [...changeEmailOtpVerificationInputs].map(changeEmailOtpVerificationInput => changeEmailOtpVerificationInput.value).join("");

            updateButtonState(changeEmailOtpVerificationSubmitButton, true);

            try {
                const { message } = await api.changeEmailOtpVerification({ email, otpCode });

                removeSessionStorageItem("otp-change-email-status");
                removeSessionStorageItem("otp-change-email-email");

                changeEmailOtpVerificationModal?.remove();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(changeEmailOtpVerificationSubmitButton, false);
            };
        };
    });
};