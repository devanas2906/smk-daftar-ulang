import { createAdminMasterDataManagementTable, createAdminMasterDataManagementTableRow } from "../../components/master-data/admin-master-data-content.js";

import { setStartEndMasterDataTableRow, getStartEndMasterDataTableRow } from "../../utilities/master-data/master-data-table-utils.js";
import { masterDataPerPagination } from "../../utilities/master-data/master-data-config.js";

import { getMasterData, getMasterDataKey, getFindMasterDataConfig } from "../../utilities/master-data/master-data-management-utils.js";

export const renderAdminMasterDataTable = () => {
    const adminDashboardManagementTableContainer = document.querySelector('.admin-dashboard-management-table-container');
    const adminMasterDataManagementTable = createAdminMasterDataManagementTable();
    adminDashboardManagementTableContainer.appendChild(adminMasterDataManagementTable);
};

export const renderAdminMasterDataTableRow = () => {
    const findMasterDataConfig = getFindMasterDataConfig();
    const masterDataKey = getMasterDataKey();

    const { [masterDataKey]: masterData } = getMasterData();
    const { start, end } = getStartEndMasterDataTableRow();

    const adminDashboardMasterDataManagementTableBody = document.querySelector('.admin-dashboard-master-data-management-table-body');
    adminDashboardMasterDataManagementTableBody.innerHTML = "";

    masterData
        .slice(start, end)
        .forEach(data => {
            const adminMasterDataManagementTableRow = createAdminMasterDataManagementTableRow(data);
            adminDashboardMasterDataManagementTableBody.appendChild(adminMasterDataManagementTableRow);
        });
};

export const initializeRenderAdminMasterDataTable = () => {
    renderAdminMasterDataTable();
    setStartEndMasterDataTableRow(0, masterDataPerPagination);
};