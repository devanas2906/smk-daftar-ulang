import validator from "validator";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminSchoolSettingsForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const adminDashboardSchoolSettingsForm = event.target.closest('.admin-dashboard-school-settings-management-form');

        if (adminDashboardSchoolSettingsForm) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const adminSchoolSettingSubmitButton = adminDashboardSchoolSettingsForm.querySelector('.school-settings-submit-button');

            const schoolNameInput = document.getElementById('schoolName');
            const schoolAddressInput = document.getElementById('schoolAddress');
            const schoolEmailInput = document.getElementById('schoolEmail');
            const schoolNumberPhoneInput = document.getElementById('schoolNumberPhone');
            const principalNameInput = document.getElementById('principalName');
            const treasurerNameInput = document.getElementById('treasurerName');

            const schoolName = schoolNameInput.value.trim();
            const schoolAddress = schoolAddressInput.value.trim();
            const schoolEmail = schoolEmailInput.value.trim();
            const schoolNumberPhone = schoolNumberPhoneInput.value.trim();
            const principalName = principalNameInput.value.trim();
            const treasurerName = treasurerNameInput.value.trim();

            // error input elements
            const schoolNameError = document.getElementById('schoolNameError');
            const schoolAddressError = document.getElementById('schoolAddressError');
            const schoolEmailError = document.getElementById('schoolEmailError');
            const schoolNumberPhoneError = document.getElementById('schoolNumberPhoneError');
            const principalNameError = document.getElementById('principalNameError');
            const treasurerNameError = document.getElementById('treasurerNameError');

            // validation school settings
            const isValidSchoolName = schoolName;
            const isValidSchoolAddress = schoolAddress;

            const isValidSchoolEmail = validator.isEmail(schoolEmail);
            const isValidSchoolNumberPhone = validator.isMobilePhone(schoolNumberPhone, "id-ID");

            const isValidPrincipalName = validator.isLength(principalName, { min: 3, max: 20 });
            const isValidTreasurerName = validator.isLength(treasurerName, { min: 3, max: 20 });

            // clear message of error input elements
            schoolNameError.textContent = '';
            schoolAddressError.textContent = '';
            schoolEmailError.textContent = '';
            schoolNumberPhoneError.textContent = '';
            principalNameError.textContent = '';
            treasurerNameError.textContent = '';

            if (!isValidSchoolName) return schoolNameError.textContent = 'Nama sekolah tidak boleh kosong.';
            if (!isValidSchoolAddress) return schoolAddressError.textContent = 'Alamat sekolah tidak boleh kosong.';

            if (!isValidSchoolEmail) return schoolEmailError.textContent = 'Format email sekolah tidak valid.';
            if (!isValidSchoolNumberPhone) return schoolNumberPhoneError.textContent = 'Format nomor telepon sekolah tidak valid.';

            if (!isValidPrincipalName) return principalNameError.textContent = 'Nama kepala sekolah minimal 3 karakter & maksimal 20 karakter.';
            if (!isValidTreasurerName) return treasurerNameError.textContent = 'Nama bendahara minimal 3 karakter & maksimal 20 karakter.';

            const updateSchoolPayload = { schoolName, schoolAddress, schoolEmail, schoolNumberPhone, principalName, treasurerName };

            updateButtonState(adminSchoolSettingSubmitButton, true);

            try {
                const responseSweetalert2 = await applySweetalert2Confirm("question", "Yakin?", "Apakah yakin ingin ubah data sekolah?", "Ya Ubah", "Batal");
                if (!responseSweetalert2.isConfirmed) return;

                const { message } = await api.updateSchoolData(updateSchoolPayload);
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(adminSchoolSettingSubmitButton, false);
            };

        };
    });
};