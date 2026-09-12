import { getSessionStorageItem } from "../../../../../common/js/auth.js";
import { setMasterData } from "../../utilities/master-data/master-data-management-utils.js";

import { renderAdminMasterDataManagementContent } from "./render-admin-master-data-management.js";
import { initializeRenderAdminMasterDataTable } from "./render-admin-master-data-table.js";
import { initializeRenderMasterDataManagementPagination } from "./render-admin-master-data-pagination.js";

import { updateMasterDataTableAndPagination } from "../../utilities/master-data/update-master-data-table-pagination.js";

export const initializeRenderMasterDataManagement = async () => {
    const activePageSession = getSessionStorageItem('active-page-session') || "major";
    await setMasterData(activePageSession);

    renderAdminMasterDataManagementContent();
    initializeRenderAdminMasterDataTable();
    initializeRenderMasterDataManagementPagination();

    updateMasterDataTableAndPagination();
};