import { createStudentNotificationManagementContent } from "../../components/notification/student-notification-content.js";

export const renderStudentNotificationManagementContent = () => {
    const studentDashboardContent = document.querySelector('.student-dashboard-content');
    if (!studentDashboardContent) return;

    studentDashboardContent.innerHTML = "";

    const studentNotificationManagementContent = createStudentNotificationManagementContent();
    studentDashboardContent.appendChild(studentNotificationManagementContent);
};