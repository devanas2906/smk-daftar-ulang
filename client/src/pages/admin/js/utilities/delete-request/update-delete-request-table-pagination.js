import { renderAdminDeleteRequestTableRow } from "../../renders/delete-request/render-admin-delete-request-table.js";
import { renderDeleteRequestManagementPaginationInfo, renderDeleteRequestManagementPaginationPage } from "../../renders/delete-request/render-admin-delete-request-pagination.js";

import { getDeleteRequests } from "./delete-request-config.js";

import { updateManagementContentState } from "../render-utils.js";

export const updateDeleteRequestTableAndPagination = () => {
    const { deleteRequests } = getDeleteRequests();

    renderAdminDeleteRequestTableRow();
    renderDeleteRequestManagementPaginationInfo();
    renderDeleteRequestManagementPaginationPage();

    updateManagementContentState(deleteRequests.length, "Tidak ada permintaan penghapusan akun.");
};