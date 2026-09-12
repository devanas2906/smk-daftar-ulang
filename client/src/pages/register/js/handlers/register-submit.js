import { redirectByRole, setLocalStorageItem, getSessionStorageItem, removeSessionStorageItem } from "../../../../common/js/auth.js";
import { parseRupiah } from "../../../../common/js/currency.js";

import { apiFetch } from "../../../../common/js/api-utils.js";

import { registerValidation, registerStepValidation } from "../utilities/register-validation.js";

import { updateButtonState } from "../../../../common/js/button-state-utils.js";
import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../common/js/utilities/sweetalert2.js";

export const handleRegisterSubmit = () => {
    document.body.addEventListener('submit', async (event) => {
        const registerForm = event.target.closest('.register-form');

        if (registerForm) {
            event.preventDefault();

            const registerSubmitButton = registerForm.querySelector('.register-submit-button');
            const registrationToken = getSessionStorageItem("registration-token");

            const nisn = registerForm.querySelector('#nisn').value.trim();
            const name = registerForm.querySelector('#name').value.trim();
            const parentName = registerForm.querySelector('#parent-name').value.trim();
            const studentAddress = registerForm.querySelector('#student-address').value.trim();
            const email = getSessionStorageItem('otp-register-email') || "";
            const password = registerForm.querySelector('#password').value;
            const paymentAmount = parseRupiah(registerForm.querySelector('#payment-amount').value);

            const entryYear = registerForm.querySelector('#entry-year').value.trim();
            const major = registerForm.querySelector('#major').selectedOptions[0].value.trim();

            const kartuTandaPendudukFile = registerForm.querySelector('#ktp').files[0];
            const kartuKeluargaFile = registerForm.querySelector('#kartu-keluarga').files[0];
            const ijazahSmpFile = registerForm.querySelector('#ijazah-smp').files[0];
            const buktiPembayaranFile = registerForm.querySelector('#bukti-pembayaran').files[0];

            const { isValid, message } = registerValidation();
            const { isFinishStep } = registerStepValidation();

            if (!isValid) return applySweetalert2Message("warning", "Periksa Kembali", message);
            if (!isFinishStep) return;

            const formData = new FormData();

            formData.set("registrationToken", registrationToken);
            formData.set("nisn", nisn);
            formData.set("name", name);
            formData.set("parentName", parentName);
            formData.set("address", studentAddress);
            formData.set("email", email);
            formData.set("password", password);
            formData.set("paymentAmount", paymentAmount);
            formData.set("batch", entryYear);
            formData.set("major", major);

            formData.set('kartuTandaPenduduk', kartuTandaPendudukFile);
            formData.set('kartuKeluarga', kartuKeluargaFile);
            formData.set('ijazahSmp', ijazahSmpFile);
            formData.set('buktiPembayaran', buktiPembayaranFile);

            updateButtonState(registerSubmitButton, true);

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('question', 'Yakin', 'Apakah Anda yakin ingin melakukan registrasi?', 'Ya', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const { message, token } = await apiFetch('/auth/register', { method: 'POST', body: formData });

                await applySweetalert2Message('success', 'Berhasil', message);

                removeSessionStorageItem('otp-register-status');
                removeSessionStorageItem('otp-register-email');
                removeSessionStorageItem('registration-token');

                setLocalStorageItem('token', token);
                redirectByRole('student');
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(registerSubmitButton, false);
            };
        };
    });
};