import { createAdminEmptyContent } from "../components/admin-empty-content.js";

export const renderAdminEmptyContent = (message) => {
    const adminDashboardManagementContent = document.querySelector('.admin-dashboard-management-content');

    const adminEmptyContent = createAdminEmptyContent(message);
    adminDashboardManagementContent.appendChild(adminEmptyContent);
};