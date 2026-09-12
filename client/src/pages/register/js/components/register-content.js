import { createElement } from "../../../../common/js/component-utils.js";
import { formatRupiah } from "../../../../common/js/currency.js";

import { getSessionStorageItem } from "../../../../common/js/auth.js";
import { getMasterRegisterOptions } from "../utilities/register-content.js";

export const createRegisterContent = () => {
   const email = getSessionStorageItem("otp-register-email") || "";
   const { masterRegisterOptions: { activeBatch, majors } } = getMasterRegisterOptions();

   const registerContent = createElement(
      `<div class="auth-component-background register-background">
            <div class="auth-component-content register-content">
               <div class="auth-component-brand register-brand"><i class="fa-solid fa-graduation-cap"></i></div>
               <h1 class="auth-component-title register-title">Daftar Ulang Sekolah</h1>
               <p class="auth-component-subtitle register-subtitle">Silakan isi data untuk melakukan daftar ulang</p>

               <form class="auth-component-form register-form">
                  <span class="register-step-label">Langkah 1 dari 2</span>
               
                  <div class="swiper register-input-group-container">
                     <div class="swiper-wrapper register-input-group-wrapper">

                        <div class="swiper-slide register-input-group-item">
                           <span class="register-input-group-container-item-label">Informasi Daftar Ulang</span>

                           <div class="auth-component-input-group register-input-group">
                              <label for="nisn" class="auth-component-input-label register-input-label">NISN</label>
                              <i class="fa-solid fa-id-card"></i>
                              <input type="text" id="nisn" name="nisn" class="auth-component-input register-input register-nisn-input" placeholder="Masukkan 10 digit NISN Anda"  />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="name" class="auth-component-input-label register-input-label">Nama Lengkap</label>
                              <i class="fa-solid fa-user"></i>
                              <input type="text" id="name" name="name" class="auth-component-input register-input register-name-input" placeholder="Masukkan nama lengkap Anda"  />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="parent-name" class="auth-component-input-label register-input-label">Nama Orang Tua / Wali</label>
                              <i class="fa-solid fa-people-group"></i>
                              <input type="text" id="parent-name" name="parentName" class="auth-component-input register-input register-parent-name-input" placeholder="Masukkan nama orang tua / wali Anda"  />
                           </div>
                     
                           <div class="auth-component-input-group register-input-group">
                              <label for="student-address" class="auth-component-input-label register-input-label">Alamat Rumah</label>
                              <i class="fa-solid fa-location-dot"></i>
                              <input type="text" id="student-address" name="studentAddress" class="auth-component-input register-input register-student-address-input" placeholder="Masukkan alamat rumah Anda"  />
                           </div>
                  
                           <div class="auth-component-input-group register-input-group">
                              <label for="email" class="auth-component-input-label register-input-label">Email</label>
                              <i class="fa-solid fa-envelope"></i>
                              <input type="email" id="email" name="email" class="auth-component-input register-input register-email-input" value="${email}" placeholder="Masukkan email akun Anda" readonly />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="password" class="auth-component-input-label register-input-label">Password</label>
                              <i class="fa-solid fa-lock"></i>
                              <input type="password" id="password" name="password" class="auth-component-input register-input register-password-input" placeholder="Masukkan password akun Anda"  />
                           </div>
                        </div>

                        <div class="swiper-slide register-input-group-item">
                           <span class="register-input-group-container-item-label">Informasi Akademik</span>

                           <div class="auth-component-input-group register-input-group">
                              <label class="auth-component-input-label register-input-label">Tahun Angkatan</label>
                              <i class="fa-solid fa-calendar"></i>
                              <input type="text" class="auth-component-input register-input register-entry-year-input" value="${activeBatch.entryYear}" readonly />
                              <input type="hidden" id="entry-year" value="${activeBatch._id}">
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="major" class="auth-component-input-label register-input-label">Pilih Jurusan</label>
                              <i class="fa-solid fa-sitemap"></i>
                              <select id="major" class="auth-component-input register-select register-major-select"><option value="" selected disabled>Pilih Jurusan</option></select>
                           </div>
                        </div>

                        <div class="swiper-slide register-input-group-item">
                           <span class="register-input-group-container-item-label">Berkas Dokumen (Format PDF & Ukuran Maksimal 2 MB)</span>

                           <div class="auth-component-input-group register-input-group">
                              <label for="ktp" class="auth-component-input-label register-input-label">Kartu Tanda Penduduk (KTP)</label>
                              <i class="fa-solid fa-file"></i>
                              <input type="file" id="ktp" name="ktp" accept="application/pdf" class="auth-component-input register-input register-ktp-input"  />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="kk" class="auth-component-input-label register-input-label">Kartu Keluarga (KK)</label>
                              <i class="fa-solid fa-file"></i>
                              <input type="file" id="kartu-keluarga" name="kartu-keluarga" accept="application/pdf" class="auth-component-input register-input register-kartu-keluarga-input"  />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="ijazah-smp" class="auth-component-input-label register-input-label">Ijazah SMP</label>
                              <i class="fa-solid fa-file"></i>
                              <input type="file" id="ijazah-smp" name="ijazah-smp" accept="application/pdf" class="auth-component-input register-input register-ijazah-smp-input"  />
                           </div>
                        </div>

                        <div class="swiper-slide register-input-group-item">
                           <span class="register-input-group-container-item-label">Informasi Pembayaran</span>

                           <div class="auth-component-input-group register-input-group">
                              <label for="payment-amount" class="auth-component-input-label register-input-label">Jumlah Bayar</label>
                              <i class="fa-solid fa-money-bill-wave"></i>
                              <input type="text" id="payment-amount" name="payment-amount" inputmode="numeric" class="auth-component-input register-input register-payment-amount-input" placeholder="Masukkan jumlah pembayaran Anda" />
                           </div>

                           <div class="auth-component-input-group register-input-group">
                              <label for="bukti-pembayaran" class="auth-component-input-label register-input-label">Bukti Pembayaran</label>
                              <i class="fa-solid fa-file"></i>
                              <input type="file" id="bukti-pembayaran" name="bukti-pembayaran" accept="application/pdf" class="auth-component-input register-input register-bukti-pembayaran-input"  />
                           </div>
                        </div>
                        
                     </div>
                  </div>

                  <div class="register-input-group-control-buttons">
                     <button type="button" class="auth-component-submit-button register-input-group-control-button register-input-group-control-previous-button">Kembali</button>
                     <button type="button" class="auth-component-submit-button register-input-group-control-button register-input-group-control-next-button">Selanjutnya</button>
                     <button type="submit" class="auth-component-submit-button register-submit-button">Simpan & Lanjutkan</button>
                  </div>
                  
               </form>
            </div>
        </div>`
   );

   const registerStepLabel = registerContent.querySelector('.register-step-label');
   const allRegisterStep = registerContent.querySelectorAll('.register-input-group-item').length;

   const registerMajorSelect = registerContent.querySelector('.register-major-select');
   const registerPaymountAmountInput = registerContent.querySelector('#payment-amount');

   registerStepLabel.textContent = `Langkah 1 dari ${allRegisterStep}`;

   for (const major of majors) {
      const { _id, majorName } = major;
      const masterRegisterOption = createMasterRegisterOption(_id, majorName);
      registerMajorSelect.appendChild(masterRegisterOption);
   };

   registerPaymountAmountInput.addEventListener('input', function (event) {
      event.target.value = formatRupiah(this.value);
   });

   return registerContent;
};

const createMasterRegisterOption = (_id, label) => createElement(`<option value="${_id}">${label}</option>`);