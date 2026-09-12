import { createElement } from "../../../../common/js/component-utils.js";

export const createForgotPasswordSendOtpModal = () => {
   const forgotPasswordSendOtpModal = createElement(
      `<div class="login-component-modal-overlay forgot-password-send-otp-modal-overlay forgot-password-modal-overlay">
            <div class="login-component-modal forgot-password-send-otp-modal forgot-password-modal">
            
               <div class="login-component-modal-header forgot-password-send-otp-header forgot-password-header">
                  <h2 class="login-component-modal-title forgot-password-send-otp-title">Lupa Password?</h2>
                  <button type="button" class="forgot-password-send-otp-close-button forgot-password-close-button"><i class="fa-solid fa-xmark"></i></button>
                  <p class="login-component-modal-subtitle forgot-password-send-otp-subtitle">Anda bisa mengubah password dengan beberapa proses terlebih dahulu.</p>
               </div>
            
               <form class="auth-component-form forgot-password-send-otp-form">
                  <div class="auth-component-input-group forgot-password-send-otp-input-group">
                     <label for="email" class="auth-component-input-label forgot-password-send-otp-input-label">Email</label>
                     <i class="fa-solid fa-envelope"></i>
                     <input type="email" id="email" class="auth-component-input forgot-password-send-otp-input" placeholder="Masukkan email Anda" required />
                  </div>

                 <button type="submit" class="auth-component-submit-button forgot-password-send-otp-submit-button">Lanjut</button>
              </form>
           </div>
         </div>`
   );

   const modalOverlayCloseButton = forgotPasswordSendOtpModal.querySelector(".forgot-password-send-otp-close-button");
   modalOverlayCloseButton.addEventListener("click", () => forgotPasswordSendOtpModal.remove());

   return forgotPasswordSendOtpModal;
};

export const createForgotPasswordOtpVerificationModal = () => {
   const forgotPasswordOtpVerificationModal = createElement(
      `<div class="login-component-modal-overlay forgot-password-otp-verification-modal-overlay forgot-password-modal-overlay">
            <div class="login-component-modal forgot-password-otp-verification-modal forgot-password-modal">
            
               <div class="login-component-modal-header forgot-password-otp-verification-header forgot-password-header">
                  <h2 class="login-component-modal-title forgot-password-otp-verification-title">Verifikasi Kode OTP</h2>
                  <button type="button" class="forgot-password-otp-verification-close-button forgot-password-close-button"><i class="fa-solid fa-xmark"></i></button>
                  <p class="login-component-modal-subtitle forgot-password-otp-verification-subtitle">Masukkan 6 digit kode yang telah dikirimkan ke email Anda.</p>
               </div>
            
               <form class="auth-component-form forgot-password-otp-verification-form">
                  <div class="forgot-password-otp-verification-input-container">
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="forgot-password-otp-verification-input otp-verification-input" inputmode="numeric" required>
                  </div>
                     
                  <button type="submit" class="auth-component-submit-button forgot-password-otp-verification-submit-button">Lanjut</button>
               </form>

               <div class="forgot-password-resend-otp">
                  <span class="forgot-password-resend-otp-title">Tidak mendapatkan kode OTP?</span>
                  <span class="forgot-password-resend-otp-button resend-otp-button">Kirim ulang kode</span>
                  <span class="forgot-password-resend-otp-timer resend-otp-timer">00:00</span>
               </div>
           </div>
         </div>`
   );

   const modalOverlayCloseButton = forgotPasswordOtpVerificationModal.querySelector(".forgot-password-otp-verification-close-button");
   modalOverlayCloseButton.addEventListener("click", () => forgotPasswordOtpVerificationModal.remove());

   return forgotPasswordOtpVerificationModal;
};

export const createForgotChangePasswordModal = () => {
   const forgotChangePasswordModal = createElement(
      `<div class="login-component-modal-overlay forgot-change-password-modal-overlay forgot-password-modal-overlay">
            <div class="login-component-modal forgot-change-password-modal forgot-password-modal">
            
               <div class="login-component-modal-header forgot-change-password-header forgot-password-header">
                  <h2 class="login-component-modal-title forgot-change-password-title">Ubah Password</h2>
                  <button type="button" class="forgot-change-password-close-button forgot-password-close-button"><i class="fa-solid fa-xmark"></i></button>
                  <p class="login-component-modal-subtitle forgot-change-password-subtitle">Silahkan ubah password Anda, buatlah password yang sulit ditebak.</p>
               </div>
            
               <form class="auth-component-form forgot-change-password-form">
                  <div class="auth-component-input-group forgot-change-password-input-group">
                     <label for="password" class="auth-component-input-label forgot-change-password-input-label">Password</label>
                     <i class="fa-solid fa-key"></i>
                     <input type="password" id="password" class="auth-component-input forgot-change-password-input" placeholder="Masukkan password Anda" required />
                  </div>

                 <button type="submit" class="auth-component-submit-button forgot-change-password-submit-button">Simpan</button>
              </form>
           </div>
         </div>`
   );

   const modalOverlayCloseButton = forgotChangePasswordModal.querySelector(".forgot-change-password-close-button");
   modalOverlayCloseButton.addEventListener("click", () => forgotChangePasswordModal.remove());

   return forgotChangePasswordModal;
};