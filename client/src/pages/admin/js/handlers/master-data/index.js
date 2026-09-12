import { handleAdminMasterDataModal, handleAdminMasterDataModalForm } from "./admin-master-data-modal.js";
import { handleAdminDeleteMasterData } from "./admin-master-data-delete.js";
import { initializeHandleMasterDataPaginationControls } from "./admin-master-data-pagination-controls.js";

export const initializeMasterDataManagementHandlers = () => {
    handleAdminMasterDataModal();
    handleAdminMasterDataModalForm();
    handleAdminDeleteMasterData();
    initializeHandleMasterDataPaginationControls();
};