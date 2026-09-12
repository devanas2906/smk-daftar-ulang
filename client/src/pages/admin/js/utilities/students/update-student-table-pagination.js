import { renderAdminStudentTableRow } from "../../renders/students/render-admin-student-table.js";
import { renderStudentManagementPaginationInfo, renderStudentManagementPaginationPage } from "../../renders/students/render-admin-student-pagination.js";

import { getStudents } from "./student-config.js";

import { updateManagementContentState } from "../render-utils.js";

export const updateStudentTableAndPagination = () => {
    const { students } = getStudents();

    renderAdminStudentTableRow();
    renderStudentManagementPaginationInfo();
    renderStudentManagementPaginationPage();

    updateManagementContentState(students.length, "Tidak ada data siswa yang sesuai.");
};