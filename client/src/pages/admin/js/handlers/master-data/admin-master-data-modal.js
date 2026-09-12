import { getSessionStorageItem } from "../../../../../common/js/auth.js";

import { createAdminMasterDataModal } from "../../components/master-data/admin-master-data-modal.js";

import { masterDataTableRowPrivateData } from "../../utilities/master-data/master-data-management-utils.js";
import { setFormModalMode, getFormModalMode, setActiveDataDocumentId, getActiveDataDocumentId } from "../../utilities/modal-utils.js";

import { getMasterPayload } from "../../utilities/master-data/master-data-modal-utils.js";

import { setMasterData } from "../../utilities/master-data/master-data-management-utils.js";
import { updateMasterDataTableAndPagination } from "../../utilities/master-data/update-master-data-table-pagination.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminMasterDataModal = () => {
    document.body.addEventListener('click', async function (event) {
        const addMasterDataButton = event.target.closest('.add-master-data-button');
        const editMasterDataButton = event.target.closest('.admin-dashboard-master-data-management-action-edit-button');

        // add master data
        if (addMasterDataButton) {
            event.stopImmediatePropagation();

            const adminMasterDataModal = createAdminMasterDataModal();
            this.appendChild(adminMasterDataModal);
            this.classList.add('overflow-hidden');
            setFormModalMode('add');
        };

        // edit master data
        if (editMasterDataButton) {
            event.stopImmediatePropagation();

            try {
                const activePageSession = getSessionStorageItem('active-page-session');
                const { masterData } = await api.getMasterData(activePageSession);
                const adminMasterDataTableRow = editMasterDataButton.closest('.admin-dashboard-master-data-management-table-row');
                const { masterDataDocumentId } = masterDataTableRowPrivateData.get(adminMasterDataTableRow);

                const findMasterDataDocument = masterData.find(data => data._id === masterDataDocumentId);

                const adminMasterDataModal = createAdminMasterDataModal(findMasterDataDocument);
                this.appendChild(adminMasterDataModal);
                this.classList.add('overflow-hidden');

                setActiveDataDocumentId(masterDataDocumentId);
                setFormModalMode('edit');
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};

export const handleAdminMasterDataModalForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const formMasterDataButton = event.target.closest('.admin-dashboard-master-data-modal-form');

        if (formMasterDataButton) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const adminMasterDataModal = formMasterDataButton.closest('.admin-dashboard-master-data-modal-overlay');

            const masterDataModalMode = getFormModalMode();
            const activeDataDocumentId = getActiveDataDocumentId();

            const { masterPayload } = getMasterPayload();
            const activePageSession = getSessionStorageItem('active-page-session');

            try {
                if (masterDataModalMode === "edit") {
                    const { message } = await api.updateMasterData(activePageSession, activeDataDocumentId, masterPayload);
                    applySweetalert2Message('success', 'Berhasil', message);
                } else {
                    const { message } = await api.createMasterData(activePageSession, masterPayload);
                    applySweetalert2Message('success', 'Berhasil', message);
                };

                adminMasterDataModal?.remove();
                this.classList.remove('overflow-hidden');

                await setMasterData(activePageSession);
                updateMasterDataTableAndPagination();
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);

            };
        };

    });
};