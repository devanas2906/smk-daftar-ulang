import { renderAdminEmptyContent } from "../renders/render-admin-empty-content";

export const updateManagementContentState = (hasData, message) => {
    const adminDashboardManagementTableContainer = document.querySelector('.admin-dashboard-management-table-container');
    const adminDashboardManagementPaginationContainer = document.querySelector('.admin-dashboard-management-pagination');

    const existingAdminEmptyContent = document.querySelector('.admin-empty-content');

    adminDashboardManagementTableContainer.classList.toggle('hide-table-container', !hasData);
    adminDashboardManagementPaginationContainer?.classList.toggle('hide-pagination-container', !hasData);

    if (existingAdminEmptyContent && hasData) existingAdminEmptyContent.remove();
    if (!existingAdminEmptyContent && !hasData) renderAdminEmptyContent(message);
};