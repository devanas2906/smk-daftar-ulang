import { setDeleteRequests } from "../../utilities/delete-request/delete-request-config.js";

import { renderAdminDeleteRequestManagementContent } from "./render-admin-delete-request-management.js";
import { initializeRenderAdminDeleteRequestTable } from "./render-admin-delete-request-table.js";
import { initializeRenderDeleteRequestManagementPagination } from "./render-admin-delete-request-pagination.js";

import { updateDeleteRequestTableAndPagination } from "../../utilities/delete-request/update-delete-request-table-pagination.js";

export const initializeRenderDeleteRequestManagement = async () => {
    await setDeleteRequests();

    renderAdminDeleteRequestManagementContent();
    initializeRenderAdminDeleteRequestTable();
    initializeRenderDeleteRequestManagementPagination();

    updateDeleteRequestTableAndPagination();
};