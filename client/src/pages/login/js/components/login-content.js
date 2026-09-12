import { createElement } from "../../../../common/js/component-utils.js";

export const createLoginContent = () => {
    return createElement(
        `<div class="auth-component-background login-background">
            <div class="auth-component-content login-content">
               <div class="auth-component-brand login-brand"><i class="fa-solid fa-graduation-cap"></i></div>
               <h1 class="auth-component-title login-title">Daftar Ulang Sekolah</h1>
               <p class="auth-component-subtitle login-subtitle">Silakan masuk menggunakan akun Anda</p>

               <form class="auth-component-form login-form">
                  <div class="auth-component-input-group login-input-group">
                     <label for="email" class="auth-component-input-label login-input-label">Email</label>
                     <i class="fa-solid fa-envelope"></i>
                     <input type="text" id="email" name="email" class="auth-component-input login-input login-email-input" placeholder="Masukkan email Anda" required autocomplete="email" />
                  </div>
                  
                  <div class="auth-component-input-group login-input-group">
                     <label for="password" class="auth-component-input-label login-input-label">Password</label>
                     <i class="fa-solid fa-lock"></i>
                     <input type="password" id="password" name="password" class="auth-component-input login-input login-password-input" placeholder="Masukkan password akun Anda" required />
                  </div>

                  <button type="button" class="forgot-password-button">Lupa Password?</button>
                  <button type="submit" class="auth-component-submit-button login-submit-button">Masuk</button>
                </form>
            </div>
        </div>`
    );
};