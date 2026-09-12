import { deleteRequestTableRowPrivateData } from "../../utilities/delete-request/delete-request-management-utils.js";

import { setDeleteRequests } from "../../utilities/delete-request/delete-request-config.js";
import { updateDeleteRequestTableAndPagination } from "../../utilities/delete-request/update-delete-request-table-pagination.js";

import * as api from "../../admin-api.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import { applySweetalert2Message, applySweetalert2Confirm, applySweetalert2Input } from "../../../../../common/js/utilities/sweetalert2.js";

const handleAdminDeleteRequestApprove = () => {
    document.body.addEventListener('click', async function (event) {
        const approveDeleteRequestButton = event.target.closest('.admin-dashboard-delete-request-management-action-approve-button');

        if (approveDeleteRequestButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('warning', 'Setujui Penghapusan Akun?', 'Siswa akan menerima notifikasi untuk menghapus akunnya secara permanen.', 'Ya, Setujui', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                updateButtonState(approveDeleteRequestButton, true);

                const adminDeleteRequestTableRow = approveDeleteRequestButton.closest('.admin-dashboard-delete-request-management-table-row');
                const { deleteRequestDocumentId } = deleteRequestTableRowPrivateData.get(adminDeleteRequestTableRow);
                const { message } = await api.approveDeleteRequest(deleteRequestDocumentId);

                await setDeleteRequests();
                updateDeleteRequestTableAndPagination();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(approveDeleteRequestButton, false);
            };
        };

    });
};

const handleAdminDeleteRequestReject = () => {
    document.body.addEventListener('click', async function (event) {
        const rejectDeleteRequestButton = event.target.closest('.admin-dashboard-delete-request-management-action-reject-button');

        if (rejectDeleteRequestButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Input('Alasan Penolakan', 'text', 'Tuliskan alasan penolakan...', 'Tolak Pengajuan', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                updateButtonState(rejectDeleteRequestButton, true);

                const { value: rejectedReason } = responseSweetalert2;
                const adminDeleteRequestTableRow = rejectDeleteRequestButton.closest('.admin-dashboard-delete-request-management-table-row');
                const { deleteRequestDocumentId } = deleteRequestTableRowPrivateData.get(adminDeleteRequestTableRow);

                const { message } = await api.rejectDeleteRequest(deleteRequestDocumentId, rejectedReason);

                await setDeleteRequests();
                updateDeleteRequestTableAndPagination();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(rejectDeleteRequestButton, false);
            };
        };

    });
};

export const initializeHandleAdminDeleteRequestDecision = () => {
    handleAdminDeleteRequestApprove();
    handleAdminDeleteRequestReject();
};