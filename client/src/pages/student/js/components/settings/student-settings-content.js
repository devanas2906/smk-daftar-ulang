import { createElement } from "../../../../../common/js/component-utils.js";

export const createStudentSettingsManagementContent = ({ user: { email = "" } = {} }) => {
   return createElement(
      `<div class="student-dashboard-management-content student-dashboard-settings-management-content">
           <div class="student-dashboard-management-header">
              <h2 class="student-dashboard-management-title">Pengaturan Akun</h2>
           </div>

           <form class="student-dashboard-settings-management-form">
              <div class="form-group">
                 <label for="email">Email</label>
                 <input type="email" id="email" name="email" value="${email ? email : ""}" placeholder="Masukkan email baru">
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