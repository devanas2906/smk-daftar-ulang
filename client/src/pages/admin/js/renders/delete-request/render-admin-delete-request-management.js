import { createAdminDeleteRequestManagementContent } from "../../components/delete-request/admin-delete-request-content.js";

export const renderAdminDeleteRequestManagementContent = () => {
    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminDeleteRequestManagementContent = createAdminDeleteRequestManagementContent();
    adminDashboardContent.appendChild(adminDeleteRequestManagementContent);
};