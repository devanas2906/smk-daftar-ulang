import { renderStudentEmptyContent } from "../renders/render-student-empty-content.js";

export const updateManagementContentState = (hasData, message) => {
    const studentDashboardManagementTableContainer = document.querySelector('.student-dashboard-management-table-container');
    const studentDashboardManagementPaginationContainer = document.querySelector('.student-dashboard-management-pagination');
    const studentNotificationManagementContainer = document.querySelector('.student-dashboard-notification-container');

    const existingStudentEmptyContent = document.querySelector('.student-empty-content');

    studentDashboardManagementTableContainer?.classList.toggle('hide-table-container', !hasData);
    studentDashboardManagementPaginationContainer?.classList.toggle('hide-pagination-container', !hasData);
    studentNotificationManagementContainer?.classList.toggle('hide-notification-container', !hasData);

    if (existingStudentEmptyContent && hasData) existingStudentEmptyContent.remove();
    if (!existingStudentEmptyContent && !hasData) renderStudentEmptyContent(message);
};