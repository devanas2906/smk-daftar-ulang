import { createAdminDeleteRequestManagementTable, createAdminDeleteRequestManagementTableRow } from "../../components/delete-request/admin-delete-request-content.js";

import { setStartEndDeleteRequestTableRow, getStartEndDeleteRequestTableRow } from "../../utilities/delete-request/delete-request-table-utils.js";
import { getDeleteRequests, deleteRequestPerPagination } from "../../utilities/delete-request/delete-request-config.js";

const renderAdminDeleteRequestTable = () => {
    const adminDashboardManagementTableContainer = document.querySelector('.admin-dashboard-management-table-container');
    const adminDeleteRequestManagementTable = createAdminDeleteRequestManagementTable();
    adminDashboardManagementTableContainer.appendChild(adminDeleteRequestManagementTable);
};

export const renderAdminDeleteRequestTableRow = () => {
    const { deleteRequests } = getDeleteRequests();
    const { start, end } = getStartEndDeleteRequestTableRow();

    const adminDashboardDeleteRequestManagementTableBody = document.querySelector('.admin-dashboard-delete-request-management-table-body');
    adminDashboardDeleteRequestManagementTableBody.innerHTML = "";

    deleteRequests
        .slice(start, end)
        .forEach(deleteRequest => {
            const adminDeleteRequestManagementTableRow = createAdminDeleteRequestManagementTableRow(deleteRequest);
            adminDashboardDeleteRequestManagementTableBody.appendChild(adminDeleteRequestManagementTableRow);
        });
};

export const initializeRenderAdminDeleteRequestTable = () => {
    renderAdminDeleteRequestTable();
    setStartEndDeleteRequestTableRow(0, deleteRequestPerPagination);
};