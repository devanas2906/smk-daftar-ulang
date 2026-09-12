import { createAdminReRegistrationManagementContent } from "../../components/reregistration/admin-reregistration-content.js";

export const renderAdminReRegistrationManagementContent = () => {
    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminReRegistrationManagementContent = createAdminReRegistrationManagementContent();
    adminDashboardContent.appendChild(adminReRegistrationManagementContent);
};