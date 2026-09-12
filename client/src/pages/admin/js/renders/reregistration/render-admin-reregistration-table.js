import { createAdminReRegistrationManagementTable, createAdminReRegistrationManagementTableRow } from "../../components/reregistration/admin-reregistration-content.js";

import { setStartEndReRegistrationTableRow, getStartEndReRegistrationTableRow } from "../../utilities/reregistration/reregistration-table-utils.js";
import { getReRegistrations, reRegistrationPerPagination } from "../../utilities/reregistration/reregistration-config.js";

const renderAdminReRegistrationTable = () => {
    const adminDashboardManagementTableContainer = document.querySelector('.admin-dashboard-management-table-container');
    const adminReRegistrationManagementTable = createAdminReRegistrationManagementTable();
    adminDashboardManagementTableContainer.appendChild(adminReRegistrationManagementTable);
};

export const renderAdminReRegistrationTableRow = () => {
    const { reRegistrations } = getReRegistrations();
    const { start, end } = getStartEndReRegistrationTableRow();

    const adminDashboardReRegistrationManagementTableBody = document.querySelector('.admin-dashboard-reregistration-management-table-body');
    adminDashboardReRegistrationManagementTableBody.innerHTML = "";

    reRegistrations
        .slice(start, end)
        .forEach(reRegistration => {
            const adminReRegistrationManagementTableRow = createAdminReRegistrationManagementTableRow(reRegistration);
            adminDashboardReRegistrationManagementTableBody.appendChild(adminReRegistrationManagementTableRow);
        });
};

export const initializeRenderAdminReRegistrationTable = () => {
    renderAdminReRegistrationTable();
    setStartEndReRegistrationTableRow(0, reRegistrationPerPagination);
};