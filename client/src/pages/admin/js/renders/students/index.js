import { setMasterData } from "../../utilities/master-data/master-data-management-utils.js";
import { setStudents } from "../../utilities/students/student-config.js";

import { renderAdminStudentManagementContent } from "./render-admin-student-management.js";
import { initializeRenderAdminStudentTable } from "./render-admin-student-table.js";
import { initializeRenderStudentManagementPagination } from "./render-admin-student-pagination.js";

import { updateStudentTableAndPagination } from "../../utilities/students/update-student-table-pagination.js";

export const initializeRenderStudentManagement = async () => {
    await setMasterData("major", "batch", "class");
    await setStudents();

    renderAdminStudentManagementContent();
    initializeRenderAdminStudentTable();
    initializeRenderStudentManagementPagination();

    updateStudentTableAndPagination();
};