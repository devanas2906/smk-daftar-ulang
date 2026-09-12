import { createElement } from "../../../../common/js/component-utils.js";

export const createRegisterSendOtpContent = () => {
   return createElement(
      `<div class="auth-component-background register-send-otp-background">
            <div class="auth-component-content register-send-otp-content">
               <div class="auth-component-brand register-send-otp-brand"><i class="fa-solid fa-graduation-cap"></i></div>
               <h1 class="auth-component-title register-send-otp-title">Daftar Ulang Sekolah</h1>
               <p class="auth-component-subtitle register-send-otp-subtitle">Masukkan email Anda untuk menerima kode verifikasi</p>

               <form class="auth-component-form register-send-otp-form">
                  <div class="auth-component-input-group register-send-otp-input-group">
                     <label for="email" class="auth-component-input-label register-send-otp-input-label">Email</label>
                     <i class="fa-solid fa-envelope"></i>
                     <input type="email" id="email" name="email" class="auth-component-input register-send-otp-input register-send-otp-email-input" placeholder="Masukkan email Anda" required/>
                  </div>
                     
                  <button type="submit" class="auth-component-submit-button register-send-otp-submit-button">Lanjut</button>
               </form>
            </div>
        </div>`
   );
};

export const createRegisterOtpVerificationContent = () => {
   return createElement(
      `<div class="auth-component-background register-otp-verification-background">
            <div class="auth-component-content register-otp-verification-content">
               <div class="auth-component-brand register-otp-verification-brand"><i class="fa-solid fa-graduation-cap"></i></div>
               <h1 class="auth-component-title register-otp-verification-title">Verifikasi Kode OTP</h1>
               <p class="auth-component-subtitle register-otp-verification-subtitle">Masukkan 6 digit kode yang telah dikirimkan ke email Anda.</p>

               <form class="auth-component-form register-otp-verification-form">
                  <div class="register-otp-verification-input-container">
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                     <input type="text" maxlength="1" class="register-otp-verification-input otp-verification-input" inputmode="numeric" required>
                  </div>
                     
                  <button type="submit" class="auth-component-submit-button register-otp-verification-submit-button">Lanjut</button>
               </form>

               <div class="register-resend-otp">
                  <span class="register-resend-otp-title">Tidak mendapatkan kode OTP?</span>
                  <span class="register-resend-otp-button resend-otp-button">Kirim ulang kode</span>
                  <span class="register-resend-otp-timer resend-otp-timer">00:00</span>
               </div>
            </div>
        </div>`
   );
};