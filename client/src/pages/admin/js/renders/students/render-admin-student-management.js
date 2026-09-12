import { createAdminStudentManagementContent } from "../../components/students/admin-student-content.js";

export const renderAdminStudentManagementContent = () => {
    const adminDashboardContent = document.querySelector('.admin-dashboard-content');
    if (!adminDashboardContent) return;

    adminDashboardContent.innerHTML = "";

    const adminStudentManagementContent = createAdminStudentManagementContent();
    adminDashboardContent.appendChild(adminStudentManagementContent);
};