import validator from "validator";

import { parseRupiah } from "../../../../common/js/currency.js";
import { getSessionStorageItem } from "../../../../common/js/auth.js";

export const registerValidation = () => {
    const registerInputGroupContainerSwiper = document.querySelector('.register-input-group-container').swiper;
    if (!registerInputGroupContainerSwiper) return;

    const currentRegisterStep = registerInputGroupContainerSwiper.realIndex + 1;

    switch (currentRegisterStep) {
        case 2: {
            const entryYear = document.querySelector('#entry-year').value.trim();
            const major = document.querySelector('#major').selectedOptions[0].value.trim();

            const stepValidations = [{ validation: entryYear, message: "Tahun angkatan tidak valid." }, { validation: major, message: "Pilih salah satu jurusan." }];
            const activeStepValidation = stepValidations.find(stepValidation => !stepValidation.validation);

            return activeStepValidation ? { isValid: false, message: activeStepValidation.message } : { isValid: true };
        };

        case 3: {
            const kartuTandaPendudukFile = document.querySelector('#ktp').files[0];
            const kartuKeluargaFile = document.querySelector('#kartu-keluarga').files[0];
            const ijazahSmpFile = document.querySelector('#ijazah-smp').files[0];

            const isDocumentCompleted = kartuTandaPendudukFile && kartuKeluargaFile && ijazahSmpFile;

            const stepValidations = [{ validation: isDocumentCompleted, message: "KTP, KK dan Ijazah wajib diunggah dalam format PDF." }];
            const activeStepValidation = stepValidations.find(stepValidation => !stepValidation.validation);

            return activeStepValidation ? { isValid: false, message: activeStepValidation.message } : { isValid: true };
        };

        case 4: {
            const paymentAmount = parseRupiah(document.querySelector('#payment-amount').value);
            const buktiPembayaranFile = document.querySelector('#bukti-pembayaran').files[0];

            const isValidPaymentAmount = paymentAmount || paymentAmount > 0;

            const stepValidations = [
                { validation: isValidPaymentAmount, message: "Jumlah bayar wajib diisi." },
                { validation: buktiPembayaranFile, message: "Bukti Pembayaran wajib diunggah dalam format PDF." }
            ];

            const activeStepValidation = stepValidations.find(stepValidation => !stepValidation.validation);
            return activeStepValidation ? { isValid: false, message: activeStepValidation.message } : { isValid: true };
        };

        default: {
            const nisn = document.querySelector('#nisn').value.trim();
            const name = document.querySelector('#name').value.trim();
            const parentName = document.querySelector('#parent-name').value.trim();
            const studentAddress = document.querySelector('#student-address').value.trim();
            const email = getSessionStorageItem('otp-register-email') || "";
            const password = document.querySelector('#password').value;

            const isValidNisn = validator.isLength(nisn, { min: 10, max: 10 });
            const isValidName = validator.isLength(name, { min: 3, max: 20 });
            const isValidParentName = validator.isLength(parentName, { min: 3, max: 20 });
            const isValidEmail = validator.isEmail(email);
            const isValidPassword = validator.isLength(password, { min: 8, max: 12 });

            const stepValidations = [
                { validation: isValidNisn, message: "NISN wajib 10 digit." },
                { validation: isValidName, message: "Nama minimal 3 karakter & maksimal 20 karakter." },
                { validation: isValidParentName, message: "Nama orang tua atau wali minimal 3 karakter & maksimal 20 karakter." },
                { validation: studentAddress, message: "Isi alamat rumah Anda." },
                { validation: isValidEmail, message: "Format email tidak valid." },
                { validation: isValidPassword, message: "Password minimal 8 karakter & maksimal 12 karakter." },
            ];

            const activeStepValidation = stepValidations.find(stepValidation => !stepValidation.validation);
            return activeStepValidation ? { isValid: false, message: activeStepValidation.message } : { isValid: true };
        };
    };
};

export const registerStepValidation = () => {
    const registerInputGroupContainerSwiper = document.querySelector('.register-input-group-container').swiper;
    if (!registerInputGroupContainerSwiper) return;

    const currentRegisterStep = registerInputGroupContainerSwiper.realIndex + 1;
    const allRegisterStep = document.querySelectorAll('.register-input-group-item').length;
    const isFinishStep = currentRegisterStep >= allRegisterStep

    return { isFinishStep };
};