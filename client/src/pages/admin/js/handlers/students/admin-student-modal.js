import validator from "validator";

import { createAdminStudentModal } from "../../components/students/admin-student-modal.js";

import { studentTableRowPrivateData, getStudentFilterPayload } from "../../utilities/students/student-management-utils.js";
import { setFormModalMode, getFormModalMode, setActiveDataDocumentId, getActiveDataDocumentId } from "../../utilities/modal-utils.js";

import { setStudents } from "../../utilities/students/student-config.js";
import { updateStudentTableAndPagination } from "../../utilities/students/update-student-table-pagination.js";

import * as api from "../../admin-api.js";
import { getRejectedReRegistration } from "../../../../../common/js/api-utils.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminStudentModal = () => {
    document.body.addEventListener('click', async function (event) {
        const addStudentButton = event.target.closest('.admin-dashboard-student-management-add-button');
        const editStudentButton = event.target.closest('.admin-dashboard-management-action-edit-button');

        if (addStudentButton) {
            event.stopImmediatePropagation();

            const adminStudentModal = createAdminStudentModal();
            this.appendChild(adminStudentModal);
            this.classList.add('overflow-hidden');
            setFormModalMode("add");
        };

        if (editStudentButton) {
            event.stopImmediatePropagation();

            const { students } = await api.getStudents();
            const adminStudentTableRow = editStudentButton.closest('.admin-dashboard-student-management-table-row');
            const { userDocumentId } = studentTableRowPrivateData.get(adminStudentTableRow);

            const student = students.find(student => student.user._id === userDocumentId) || {};
            const { user: { _id, accountStatus } = {} } = student;

            let adminStudentModalData = { student: { ...student } };

            if (accountStatus === "rejected") {
                const { rejectedReRegistration } = await getRejectedReRegistration(_id);
                adminStudentModalData = { student: { ...student }, rejectedReRegistration: { ...rejectedReRegistration } }
            };

            const adminStudentModal = createAdminStudentModal(adminStudentModalData);
            this.appendChild(adminStudentModal);
            this.classList.add('overflow-hidden');

            setFormModalMode("edit");
            setActiveDataDocumentId(userDocumentId);
        };

    });
};

export const handleAdminStudentModalForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const adminDashboardStudentModalForm = event.target.closest('.admin-dashboard-student-modal-form');

        if (adminDashboardStudentModalForm) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let studentPayload = {};

            const studentModalMode = getFormModalMode();
            const activeUserDocumentId = getActiveDataDocumentId();

            const adminStudentModal = adminDashboardStudentModalForm.closest('.admin-dashboard-student-modal-overlay');
            const adminSaveStudentModalButton = adminDashboardStudentModalForm.querySelector('.save-student-modal-button');

            const { students } = await api.getStudents();
            const { user: { accountStatus } = {} } = students.find(student => student.user._id === activeUserDocumentId) || {};

            const isRejectedAccountStatus = accountStatus === "rejected";

            if (studentModalMode === "add" || (studentModalMode === "edit" && !isRejectedAccountStatus)) {
                const emailValue = adminDashboardStudentModalForm.querySelector('#email').value.trim();
                const nisnValue = adminDashboardStudentModalForm.querySelector('#nisn').value.trim();
                const nameValue = adminDashboardStudentModalForm.querySelector('#name').value.trim();

                const majorValue = adminDashboardStudentModalForm.querySelector('#major').selectedOptions[0].value.trim();
                const entryYearValue = adminDashboardStudentModalForm.querySelector('#entry-year').selectedOptions[0].value.trim();
                const classValue = adminDashboardStudentModalForm.querySelector('#class')?.selectedOptions[0].value.trim();

                const parentNameValue = adminDashboardStudentModalForm.querySelector('#parent-name').value.trim();
                const studentAddressValue = adminDashboardStudentModalForm.querySelector('#student-address').value.trim();
                const accountStatusValue = adminDashboardStudentModalForm.querySelector('#account-status')?.selectedOptions[0].value.trim();

                const isValidEmail = validator.isEmail(emailValue);
                const isValidNisn = validator.isLength(nisnValue, { min: 10, max: 10 });
                const isValidName = validator.isLength(nameValue, { min: 3, max: 20 });
                const isValidParentName = validator.isLength(parentNameValue, { min: 3, max: 20 });

                if (!isValidEmail) return applySweetalert2Message('warning', "Periksa Kembali", "Format email tidak valid");
                if (!isValidNisn) return applySweetalert2Message('warning', "Periksa Kembali", "NISN wajib 10 digit");
                if (!isValidName) return applySweetalert2Message('warning', "Periksa Kembali", "Nama minimal 3 karakter & maksimal 20 karakter");

                if (studentModalMode === "edit") {
                    const isPendingVerificationAccountStatus = accountStatus === "pending_verification";

                    if (isPendingVerificationAccountStatus) {
                        if (!majorValue || !entryYearValue) return applySweetalert2Message('warning', "Periksa Kembali", "Pilih salah satu jurusan dan angkatan");
                    } else {
                        if (!majorValue || !entryYearValue || !classValue) return applySweetalert2Message('warning', "Periksa Kembali", "Pilih salah satu jurusan, angkatan dan kelas");
                        if (!accountStatusValue) return applySweetalert2Message('warning', "Periksa Kembali", "Pilih salah satu status akun");
                    };

                } else {
                    if (!majorValue || !entryYearValue || !classValue) return applySweetalert2Message('warning', "Periksa Kembali", "Pilih salah satu jurusan, angkatan dan kelas");
                };

                if (!isValidParentName) return applySweetalert2Message('warning', "Periksa Kembali", "Nama orang tua atau wali minimal 3 karakter & maksimal 20 karakter");
                if (!studentAddressValue) return applySweetalert2Message('warning', "Periksa Kembali", "Isi alamat rumah siswa");

                studentPayload = { email: emailValue, nisn: nisnValue, name: nameValue, major: majorValue, batch: entryYearValue, class: classValue, parentName: parentNameValue, address: studentAddressValue, accountStatus: accountStatusValue };
            };

            updateButtonState(adminSaveStudentModalButton, true);

            try {
                if (studentModalMode === "edit" && isRejectedAccountStatus) {
                    const responseSweetalert2 = await applySweetalert2Confirm("question", "Batalkan Penolakan Akun?", "Apakah Anda yakin ingin membatalkan penolakan akun?", "Ya", "Batal");
                    if (!responseSweetalert2.isConfirmed) return;

                    const { message } = await api.restoreRejectedStudent(activeUserDocumentId);
                    applySweetalert2Message('success', "Berhasil", message);
                } else {
                    if (studentModalMode === "edit") {
                        const { message } = await api.updateStudent(activeUserDocumentId, studentPayload);
                        applySweetalert2Message('success', "Berhasil", message);
                    } else {
                        const { message } = await api.createStudent(studentPayload);
                        applySweetalert2Message('success', "Berhasil", message);
                    };
                };

                const studentFilterPayload = getStudentFilterPayload();

                adminStudentModal.remove();
                this.classList.remove('overflow-hidden');

                await setStudents(studentFilterPayload);
                updateStudentTableAndPagination();
            } catch (error) {
                applySweetalert2Message('error', "Gagal", error.message);
            } finally {
                updateButtonState(adminSaveStudentModalButton, false);
            };

        };

    });
};