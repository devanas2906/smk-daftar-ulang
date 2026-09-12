import { createAdminSettingsManagementContent } from "../../components/settings/admin-settings-content.js";

import * as api from "../../admin-api.js";

export const renderAdminSettingsManagementContent = async () => {
    const { admin } = await api.getProfile();

    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminSettingsManagementContent = createAdminSettingsManagementContent(admin);
    adminDashboardContent.appendChild(adminSettingsManagementContent);
};