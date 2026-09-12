import { createStudentEmptyContent } from "../components/student-empty-content.js";

export const renderStudentEmptyContent = (message) => {
    const studentDashboardManagementContent = document.querySelector('.student-dashboard-management-content');

    const studentEmptyContent = createStudentEmptyContent(message);
    studentDashboardManagementContent.appendChild(studentEmptyContent);
};