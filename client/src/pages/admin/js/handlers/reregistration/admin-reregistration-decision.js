import { getReRegistrationFilterStatus } from "../../utilities/reregistration/reregistration-management-utils.js";

import { setReRegistrations } from "../../utilities/reregistration/reregistration-config.js";
import { updateReRegistrationTableAndPagination } from "../../utilities/reregistration/update-reregistration-table-pagination.js";

import { getActiveDataDocumentId } from "../../utilities/modal-utils.js";
import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message, applySweetalert2Confirm, applySweetalert2Input } from "../../../../../common/js/utilities/sweetalert2.js";

const handleAdminReRegistrationApprove = () => {
    document.body.addEventListener('click', async function (event) {
        const approveDocumentButton = event.target.closest('.approve-document-button');

        if (approveDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const classSelect = this.querySelector("#class");
                const classValue = classSelect?.selectedOptions[0].value.trim();
                if (classSelect && !classValue) return applySweetalert2Message("warning", "Periksa Kemnbali", "Pilih salah satu kelas, untuk menentukan kelas siswa");

                const responseSweetalert2 = await applySweetalert2Confirm('question', 'Yakin', 'Apakah Anda yakin menyetujui berkas ini?', 'Ya setuju', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                updateButtonState(approveDocumentButton, true);

                const adminReRegistrationModal = approveDocumentButton.closest('.admin-dashboard-reregistration-modal-overlay');
                const reRegistrationDocumentId = getActiveDataDocumentId();
                const { message } = await api.approveReRegistration(reRegistrationDocumentId, classValue);

                const reRegistrationFilterStatus = getReRegistrationFilterStatus();

                adminReRegistrationModal?.remove();
                this.classList.remove('overflow-hidden');

                await setReRegistrations(reRegistrationFilterStatus);
                updateReRegistrationTableAndPagination();

                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(approveDocumentButton, false);
            };
        };

    });
};

const handleAdminReRegistrationRevision = () => {
    document.body.addEventListener('click', async function (event) {
        const revisionDocumentButton = event.target.closest('.revision-document-button');

        if (revisionDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Input('Alasan Meminta Direvisi', 'text', 'Tuliskan alasan direvisi...', 'Minta Revisi', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                updateButtonState(revisionDocumentButton, true);

                const { value: revisionReason } = responseSweetalert2;

                const adminReRegistrationModal = revisionDocumentButton.closest('.admin-dashboard-reregistration-modal-overlay');
                const reRegistrationDocumentId = getActiveDataDocumentId();
                const { message } = await api.revisionReRegistration(reRegistrationDocumentId, revisionReason);

                const reRegistrationFilterStatus = getReRegistrationFilterStatus();

                adminReRegistrationModal?.remove();
                this.classList.remove('overflow-hidden');

                await setReRegistrations(reRegistrationFilterStatus);
                updateReRegistrationTableAndPagination();

                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(revisionDocumentButton, false);
            };
        };

    });
};

const handleAdminReRegistrationReject = () => {
    document.body.addEventListener('click', async function (event) {
        const rejectDocumentButton = event.target.closest('.reject-document-button');

        if (rejectDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Input('Alasan Penolakan', 'text', 'Tuliskan alasan penolakan...', 'Tolak Pengajuan', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                updateButtonState(rejectDocumentButton, true);

                const { value: rejectedReason } = responseSweetalert2;

                const adminReRegistrationModal = rejectDocumentButton.closest('.admin-dashboard-reregistration-modal-overlay');
                const reRegistrationDocumentId = getActiveDataDocumentId();
                const { message } = await api.rejectReRegistration(reRegistrationDocumentId, rejectedReason);

                const reRegistrationFilterStatus = getReRegistrationFilterStatus();

                adminReRegistrationModal?.remove();
                this.classList.remove('overflow-hidden');

                await setReRegistrations(reRegistrationFilterStatus);
                updateReRegistrationTableAndPagination();

                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(rejectDocumentButton, false);
            };
        };

    });
};

export const initializeHandleAdminReRegistrationDecision = () => {
    handleAdminReRegistrationApprove();
    handleAdminReRegistrationRevision();
    handleAdminReRegistrationReject();
};