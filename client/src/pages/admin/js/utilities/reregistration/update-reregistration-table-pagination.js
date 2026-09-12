import { renderAdminReRegistrationTableRow } from "../../renders/reregistration/render-admin-reregistration-table.js";
import { renderReRegistrationManagementPaginationInfo, renderReRegistrationManagementPaginationPage } from "../../renders/reregistration/render-admin-reregistration-pagination.js";

import { getReRegistrations } from "./reregistration-config.js";

import { updateManagementContentState } from "../render-utils.js";

export const updateReRegistrationTableAndPagination = () => {
    const { reRegistrations } = getReRegistrations();

    renderAdminReRegistrationTableRow();
    renderReRegistrationManagementPaginationInfo();
    renderReRegistrationManagementPaginationPage();

    updateManagementContentState(reRegistrations.length, "Tidak ada data pengajuan daftar ulang.");
};