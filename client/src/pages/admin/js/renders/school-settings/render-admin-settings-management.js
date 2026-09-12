import { createAdminSchoolSettingsManagementContent } from "../../components/school-settings/admin-school-settings-content.js";

import { getSchoolProfile } from "../../../../../common/js/api-utils.js";

export const renderAdminSchoolSettingsManagementContent = async () => {
    const { schools } = await getSchoolProfile();

    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminSchoolSettingsManagementContent = createAdminSchoolSettingsManagementContent(schools);
    adminDashboardContent.appendChild(adminSchoolSettingsManagementContent);
};