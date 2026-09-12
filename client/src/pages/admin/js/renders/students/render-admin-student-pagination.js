import { createAdminStudentManagementPagination, createAdminStudentManagementPaginationPage } from "../../components/students/admin-student-pagination.js";

import { getStudents, studentPerPagination } from "../../utilities/students/student-config.js";
import { getStartEndStudentTableRow } from "../../utilities/students/student-table-utils.js";
import { applySwiperToPaginationContainer, setNumberActivePaginationPage, getNumberActivePaginationPage } from "../../utilities/students/student-pagination-utils.js";

export const renderStudentManagementPagination = () => {
    const adminStudentManagementContent = document.querySelector('.admin-dashboard-student-management-content');
    const existingAdminStudentPagination = adminStudentManagementContent.querySelector('.admin-dashboard-management-student-pagination');
    const adminStudentPagination = createAdminStudentManagementPagination();

    if (!existingAdminStudentPagination) adminStudentManagementContent.appendChild(adminStudentPagination);
};

export const renderStudentManagementPaginationInfo = () => {
    const { students } = getStudents();
    const { start, end } = getStartEndStudentTableRow();

    const activeStudents = students.slice(start, end);

    const adminStudentPaginationRange = document.querySelector('.admin-student-pagination-range');
    const adminStudentPaginationTotal = document.querySelector('.admin-student-pagination-total');

    adminStudentPaginationRange.textContent = activeStudents.length < studentPerPagination ? `1-${activeStudents.length}` : `1-${studentPerPagination}`;
    adminStudentPaginationTotal.textContent = students.length;
};

export const renderStudentManagementPaginationPage = () => {
    const { students } = getStudents();

    const adminStudentPaginationContainer = document.querySelector('.admin-student-pagination-container');
    const adminStudentPaginationPageContainer = document.querySelector('.admin-student-pagination-pages');
    const totalStudentPages = Math.ceil(students.length / studentPerPagination);
    const numberActivePaginationPage = getNumberActivePaginationPage();

    adminStudentPaginationPageContainer.innerHTML = "";

    for (let numberPage = 1; numberPage <= totalStudentPages; numberPage++) {
        const studentPaginationPage = createAdminStudentManagementPaginationPage(numberPage);
        adminStudentPaginationPageContainer.appendChild(studentPaginationPage);

        if (numberPage === numberActivePaginationPage) {
            studentPaginationPage.classList.add('active-page');
        };
    };

    applySwiperToPaginationContainer();

    const adminStudentPaginationContainerSwiper = adminStudentPaginationContainer.swiper;
    if (adminStudentPaginationContainerSwiper) {
        const targetIndex = numberActivePaginationPage - 1;
        adminStudentPaginationContainerSwiper.slideTo(targetIndex, 0);
    };
};

export const initializeRenderStudentManagementPagination = () => {
    renderStudentManagementPagination();
    setNumberActivePaginationPage();
};