import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminSchoolSettingsManagementContent = ({ schoolName, schoolAddress, schoolEmail, schoolNumberPhone, principalName, treasurerName }) => {
   const adminSchoolSettingsManagementContent = createElement(
      `<div class="admin-dashboard-management-content admin-dashboard-school-settings-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title">Pengaturan Sekolah</h2>
           </div>

           <form class="admin-dashboard-school-settings-management-form">
              <div class="form-group">
                 <label for="schoolName">Nama Sekolah</label>
                 <input type="text" id="schoolName" name="schoolName" placeholder="Masukkan nama sekolah">
                 <span class="error-message" id="schoolNameError"></span>
              </div>

              <div class="form-group">
                 <label for="schoolAddress">Alamat Sekolah</label>
                 <input type="text" id="schoolAddress" name="schoolAddress" placeholder="Masukkan alamat sekolah">
                 <span class="error-message" id="schoolAddressError"></span>
              </div>

              <div class="form-group">
                 <label for="schoolEmail">Email Sekolah</label>
                 <input type="email" id="schoolEmail" name="schoolEmail" placeholder="Masukkan email sekolah">
                 <span class="error-message" id="schoolEmailError"></span>
              </div>

              <div class="form-group">
                 <label for="schoolNumberPhone">No HP Sekolah</label>
                 <input type="text" id="schoolNumberPhone" name="schoolNumberPhone" placeholder="Masukkan no HP sekolah">
                 <span class="error-message" id="schoolNumberPhoneError"></span>
              </div>

              <div class="form-group">
                 <label for="principalName">Nama Kepala Sekolah</label>
                 <input type="text" id="principalName" name="principalName" placeholder="Masukkan nama kepala sekolah">
                 <span class="error-message" id="principalNameError"></span>
              </div>

              <div class="form-group">
                 <label for="treasurerName">Nama Bendahara</label>
                 <input type="text" id="treasurerName" name="treasurerName" placeholder="Masukkan nama bendahara">
                 <span class="error-message" id="treasurerNameError"></span>
              </div>

             <button type="submit" class="button-component button-component-primary school-settings-submit-button">Simpan Perubahan</button>
           </form>
        </div>`
   );

   const schoolNameInput = adminSchoolSettingsManagementContent.querySelector('#schoolName');
   const schoolAddressInput = adminSchoolSettingsManagementContent.querySelector('#schoolAddress');
   const schoolEmailInput = adminSchoolSettingsManagementContent.querySelector('#schoolEmail');
   const schoolNumberPhoneInput = adminSchoolSettingsManagementContent.querySelector('#schoolNumberPhone');
   const principalNameInput = adminSchoolSettingsManagementContent.querySelector('#principalName');
   const treasurerNameInput = adminSchoolSettingsManagementContent.querySelector('#treasurerName');

   schoolNameInput.value = schoolName ? schoolName : "";
   schoolAddressInput.value = schoolAddress ? schoolAddress : "";
   schoolEmailInput.value = schoolEmail ? schoolEmail : "";
   schoolNumberPhoneInput.value = schoolNumberPhone ? schoolNumberPhone : "";
   principalNameInput.value = principalName ? principalName : "";
   treasurerNameInput.value = treasurerName ? treasurerName : "";

   return adminSchoolSettingsManagementContent;
};