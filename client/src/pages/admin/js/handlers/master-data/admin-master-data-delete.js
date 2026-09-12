import { getSessionStorageItem } from "../../../../../common/js/auth.js";

import { masterDataTableRowPrivateData } from "../../utilities/master-data/master-data-management-utils.js";

import { setMasterData } from "../../utilities/master-data/master-data-management-utils.js";
import { updateMasterDataTableAndPagination } from "../../utilities/master-data/update-master-data-table-pagination.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminDeleteMasterData = () => {
    document.body.addEventListener('click', async function (event) {
        const deleteMasterDataButton = event.target.closest('.admin-dashboard-master-data-management-action-delete-button');

        // delete master data
        if (deleteMasterDataButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('warning', 'Hapus Data?', 'Data yang dihapus tidak dapat dikembalikan.', 'Ya Hapus', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const activePageSession = getSessionStorageItem('active-page-session');
                const adminMasterDataTableRow = deleteMasterDataButton.closest('.admin-dashboard-master-data-management-table-row');
                const { masterDataDocumentId } = masterDataTableRowPrivateData.get(adminMasterDataTableRow);

                const { message } = await api.deleteMasterData(activePageSession, masterDataDocumentId);

                await setMasterData(activePageSession);
                updateMasterDataTableAndPagination();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};