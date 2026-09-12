import { createStudentSettingsManagementContent } from "../../components/settings/student-settings-content.js";

import * as api from "../../student-api.js";

export const renderStudentSettingsManagementContent = async () => {
    const { student } = await api.getProfile();

    const studentDashboardContent = document.querySelector('.student-dashboard-content');
    if (!studentDashboardContent) return;

    studentDashboardContent.innerHTML = "";

    const studentSettingsManagementContent = createStudentSettingsManagementContent(student);
    studentDashboardContent.appendChild(studentSettingsManagementContent);
};