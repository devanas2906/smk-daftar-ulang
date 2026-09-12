import { createElement } from "../../../../../common/js/component-utils.js";

export const createChangeEmailOtpVerificationModal = () => {
   const changeEmailSendOtpModal = createElement(
      `<div class="settings-change-email-modal-overlay change-email-modal-overlay change-email-otp-verification-modal-overlay">
            <div class="settings-change-email-modal change-email-otp-verification-modal">
            
               <div class="settings-change-email-modal-header">
                  <h2 class="settings-change-email-modal-title">Verifikasi Kode OTP</h2>
                  <button type="button" class="settings-change-email-close-button"><i class="fa-solid fa-xmark"></i></button>
                  <p class="settings-change-email-modal-subtitle">Masukkan 6 digit kode yang telah dikirimkan ke email Anda.</p>
               </div>
            
               <form class="auth-component-form change-email-otp-verification-form">
                  <div class="change-email-otp-verification-input-container">
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="change-email-otp-verification-input otp-verification-input" inputmode="numeric" required>
                  </div>
                     
                  <button type="submit" class="auth-component-submit-button change-email-otp-verification-submit-button">Lanjut</button>
               </form>

               <div class="change-email-resend-otp">
                  <span class="change-email-resend-otp-title">Tidak mendapatkan kode OTP?</span>
                  <span class="change-email-resend-otp-button resend-otp-button">Kirim ulang kode</span>
                  <span class="change-email-resend-otp-timer resend-otp-timer">00:00</span>
               </div>
           </div>
         </div>`
   );

   const modalOverlayCloseButton = changeEmailSendOtpModal.querySelector(".settings-change-email-close-button");
   modalOverlayCloseButton.addEventListener("click", () => changeEmailSendOtpModal.remove());

   return changeEmailSendOtpModal;
};