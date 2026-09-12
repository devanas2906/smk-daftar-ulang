import { reRegistrationTableRowPrivateData, getReRegistrationFilterStatus } from "../../utilities/reregistration/reregistration-management-utils.js";
import { setReRegistrations } from "../../utilities/reregistration/reregistration-config.js";
import { updateReRegistrationTableAndPagination } from "../../utilities/reregistration/update-reregistration-table-pagination.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminReRegistrationDelete = () => {
    document.body.addEventListener('click', async function (event) {
        const deleteDocumentButton = event.target.closest('.admin-dashboard-reregistration-management-action-delete-button');

        if (deleteDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('warning', 'Hapus berkas daftar ulang?', 'Berkas terkait akan dihapus permanen dari penyimpanan.', 'Ya, Hapus', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const adminReRegistrationTableRow = deleteDocumentButton.closest('.admin-dashboard-reregistration-management-table-row');
                const { reRegistrationDocumentId } = reRegistrationTableRowPrivateData.get(adminReRegistrationTableRow);

                const { message } = await api.deleteReRegistration(reRegistrationDocumentId);
                const reRegistrationFilterStatus = getReRegistrationFilterStatus();

                await setReRegistrations(reRegistrationFilterStatus);
                updateReRegistrationTableAndPagination();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};