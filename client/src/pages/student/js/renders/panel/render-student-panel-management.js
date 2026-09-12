import { createStudentPanelManagementContent, createStudentPanelManagementDeleteAccount } from "../../components/panel/student-panel-content.js";

export const renderStudentPanelManagementContent = () => {
    const studentDashboardContent = document.querySelector('.student-dashboard-content');
    if (!studentDashboardContent) return;

    studentDashboardContent.innerHTML = "";

    const studentPanelManagementContent = createStudentPanelManagementContent();
    const studentPanelManagementDeleteAccount = createStudentPanelManagementDeleteAccount();

    studentDashboardContent.appendChild(studentPanelManagementContent);
    studentDashboardContent.appendChild(studentPanelManagementDeleteAccount);
};