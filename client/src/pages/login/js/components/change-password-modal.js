import { createElement } from "../../../../common/js/component-utils.js";

export const createChangePasswordModal = () => {
   return createElement(
      `<div class="login-component-modal-overlay change-password-modal-overlay">
            <div class="login-component-modal change-password-modal">

               <div class="login-component-modal-header change-password-header">
                  <h2 class="login-component-modal-title change-password-title">Wajib Ganti Password</h2>
                  <p class="login-component-modal-subtitle change-password-subtitle">Anda masih menggunakan password default. Silakan buat password baru untuk melanjutkan.</p>
               </div>

               <form class="auth-component-form change-password-form">
                  <div class="auth-component-input-group change-password-input-group">
                     <label for="new-password" class="auth-component-input-label change-password-input-label">Password Baru</label>
                     <i class="fa-solid fa-key"></i>
                     <input type="password" id="new-password" class="auth-component-input change-password-input" minlength="8" maxlength="12" placeholder="Masukkan password baru akun Anda" required />
                  </div>

                 <button type="submit" class="auth-component-submit-button change-password-submit-button">Simpan &amp; Lanjutkan</button>
              </form>
           </div>
         </div>`
   );
};