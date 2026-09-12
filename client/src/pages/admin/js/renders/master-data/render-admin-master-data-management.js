import { createAdminMasterDataManagementContent } from "../../components/master-data/admin-master-data-content.js";

export const renderAdminMasterDataManagementContent = () => {
    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminMasterDataManagementContent = createAdminMasterDataManagementContent();
    adminDashboardContent.appendChild(adminMasterDataManagementContent);
};