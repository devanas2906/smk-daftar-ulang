import { renderAdminMasterDataTableRow } from "../../renders/master-data/render-admin-master-data-table.js";
import { renderMasterDataManagementPaginationInfo, renderMasterDataManagementPaginationPage } from "../../renders/master-data/render-admin-master-data-pagination.js";

import { getMasterData, getMasterDataKey, getFindMasterDataConfig } from "./master-data-management-utils.js";
import { updateManagementContentState } from "../render-utils.js";

export const updateMasterDataTableAndPagination = () => {
    const masterDataKey = getMasterDataKey();
    const { [masterDataKey]: masterData } = getMasterData();
    const findMasterDataConfig = getFindMasterDataConfig();

    renderAdminMasterDataTableRow();
    renderMasterDataManagementPaginationInfo();
    renderMasterDataManagementPaginationPage();

    updateManagementContentState(masterData.length, `Belum ada data ${findMasterDataConfig.title.toLowerCase()}.`);
};