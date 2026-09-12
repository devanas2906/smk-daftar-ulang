import { getStudentFilterPayload } from "./student-management-utils.js";

import { setStudents, studentPerPagination } from "./student-config.js";
import { setStartEndStudentTableRow } from "./student-table-utils.js";
import { setNumberActivePaginationPage } from "./student-pagination-utils.js";
import { updateStudentTableAndPagination } from "./update-student-table-pagination.js";

export const resetAndUpdateStudentByFilter = async () => {
    const studentFilterPayload = getStudentFilterPayload();
    await setStudents(studentFilterPayload);

    const adminStudentPaginationPages = document.querySelectorAll('.admin-student-pagination-page');
    const firstAdminStudentPaginationPage = adminStudentPaginationPages[0];

    adminStudentPaginationPages.forEach(studentPage => studentPage.classList.remove('active-page'));
    firstAdminStudentPaginationPage?.classList.remove('active-page');
    setStartEndStudentTableRow(0, studentPerPagination);
    setNumberActivePaginationPage();

    updateStudentTableAndPagination();
};