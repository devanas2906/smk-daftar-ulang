import { createElement } from "../../../../common/js/component-utils.js";
import { redirectByPath, removeLocalStorageItem } from "../../../../common/js/auth.js";

export const createStudentRegistrationResultCard = ({ name, note }) => {
   const studentRegistrationResultCard = createElement(
      `<div class="student-rejected-reregistration-card-wrapper">
            <div class="student-rejected-reregistration-card">
               <div class="student-rejected-reregistration-card-header">
                      <h2 class="student-rejected-reregistration-card-title">Pengajuan Pendaftaran Ditolak</h2>
               </div>

               <div class="student-rejected-reregistration-card-body">
                  <p class="student-rejected-reregistration-card-greeting">Halo, <span class="student-name">${name}</span></p>
                  <p class="student-rejected-reregistration-card-description">Mohon maaf, pengajuan pendaftaran Anda ditolak.</p>

                  <div class="student-rejected-reregistration-card-note-box">
                       <span class="student-rejected-reregistration-card-note-label">Catatan / Alasan Penolakan</span>
                       <p class="student-rejected-reregistration-card-note-content">${note}</p>
                  </div>

                  <div class="student-rejected-reregistration-card-note-account">
                       <span class="student-rejected-reregistration-card-note-account-label">Catatan Mengenai Akun</span>
                       <p class="student-rejected-reregistration-card-note-account-content">Akun Anda akan secara otomatis terhapus secara permanen dalam 3 hari setelah pengumuman ini. Seluruh data diri dan berkas yang pernah diunggah akan ikut terhapus.</p>
                  </div>

                  <div class="student-rejected-reregistration-card-contact-support">
                        <span class="student-rejected-reregistration-card-contact-support-label">Butuh bantuan lebih lanjut?</span>
                        <a href="mailto:support@email.com" class="student-rejected-reregistration-card-contact-support-link">Hubungi Tim Dukungan</a>
                  </div>
               </div>

               <div class="student-rejected-reregistration-card-footer">
                  <button type="button" class="button-component button-component-primary student-rejected-reregistration-card-logout-button">Keluar</button>
               </div>
            </div>
         </div> `
   );

   const studentRejectedReRegistrationCardLogoutButton = studentRegistrationResultCard.querySelector('.student-rejected-reregistration-card-logout-button');
   studentRejectedReRegistrationCardLogoutButton.addEventListener('click', () => {
      removeLocalStorageItem('token');
      redirectByPath("/login");
   });

   return studentRegistrationResultCard;
};