import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminSettingsManagementContent = ({ email }) => {
   return createElement(
      `<div class="admin-dashboard-management-content admin-dashboard-settings-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title">Pengaturan Akun</h2>
           </div>

           <form class="admin-dashboard-settings-management-form">
              <div class="form-group">
                 <label for="email">Email</label>
                 <input type="text" id="email" name="email" value="${email ? email : ""}" placeholder="Masukkan email baru">
                 <span class="error-message" id="emailError"></span>
              </div>

              <div class="form-group">
                 <label for="currentPassword">Password Saat Ini</label>
                 <input type="password" id="currentPassword" name="currentPassword" placeholder="Masukkan password saat ini">
                 <span class="error-message" id="currentPasswordError"></span>
              </div>

              <div class="form-group">
                 <label for="newPassword">Password Baru</label>
                 <input type="password" id="newPassword" name="newPassword" placeholder="Masukkan password baru">
                 <span class="error-message" id="newPasswordError"></span>
              </div>

              <div class="form-group">
                 <label for="confirmPassword">Konfirmasi Password</label>
                 <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Ulangi password baru">
                 <span class="error-message" id="confirmPasswordError"></span>
              </div>

             <button type="submit" class="button-component button-component-primary settings-submit-button">Simpan Perubahan</button>
           </form>
        </div>`
   );
};