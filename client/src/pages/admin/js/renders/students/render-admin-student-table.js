import { createAdminStudentManagementTable, createAdminStudentManagementTableRow } from "../../components/students/admin-student-content.js";

import { setStartEndStudentTableRow, getStartEndStudentTableRow } from "../../utilities/students/student-table-utils.js";
import { getStudents, studentPerPagination } from "../../utilities/students/student-config.js";

const renderAdminStudentTable = () => {
    const adminDashboardManagementTableContainer = document.querySelector('.admin-dashboard-management-table-container');
    const adminStudentManagementTable = createAdminStudentManagementTable();
    adminDashboardManagementTableContainer.appendChild(adminStudentManagementTable);
};

export const renderAdminStudentTableRow = () => {
    const { students } = getStudents();
    const { start, end } = getStartEndStudentTableRow();

    const adminDashboardStudentManagementTableBody = document.querySelector('.admin-dashboard-student-management-table-body');
    adminDashboardStudentManagementTableBody.innerHTML = "";

    students
        .slice(start, end)
        .forEach(student => {
            const adminStudentManagementTableRow = createAdminStudentManagementTableRow(student);
            adminDashboardStudentManagementTableBody.appendChild(adminStudentManagementTableRow);
        });
};

export const initializeRenderAdminStudentTable = () => {
    renderAdminStudentTable();
    setStartEndStudentTableRow(0, studentPerPagination);
};