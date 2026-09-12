import { createStudentPanelManagementPagination, createStudentPanelManagementPaginationPage } from "../../components/panel/student-panel-pagination.js";

import { getPanelReRegistration, panelReRegistrationPerPagination } from "../../utilities/panel/panel-config.js";
import { getStartEndPanelTableRow } from "../../utilities/panel/panel-table-utils.js";
import { applySwiperToPaginationContainer, setNumberActivePaginationPage, getNumberActivePaginationPage } from "../../utilities/panel/panel-pagination-utils.js";

const renderPanelManagementPagination = () => {
    const studentPanelManagementContent = document.querySelector('.student-dashboard-panel-management-content');
    const existingStudentPanelPagination = studentPanelManagementContent.querySelector('.student-dashboard-management-panel-pagination');
    const studentPanelPagination = createStudentPanelManagementPagination();

    if (!existingStudentPanelPagination) studentPanelManagementContent.appendChild(studentPanelPagination);
};

export const renderPanelManagementPaginationInfo = () => {
    const { panelReRegistration } = getPanelReRegistration();
    const { start, end } = getStartEndPanelTableRow();

    const activeReRegistration = panelReRegistration.slice(start, end);

    const studentPanelPaginationRange = document.querySelector('.student-panel-pagination-range');
    const studentPanelPaginationTotal = document.querySelector('.student-panel-pagination-total');

    studentPanelPaginationRange.textContent = activeReRegistration.length < panelReRegistrationPerPagination ? `1-${activeReRegistration.length}` : `1-${panelReRegistrationPerPagination}`;
    studentPanelPaginationTotal.textContent = panelReRegistration.length;
};

export const renderPanelManagementPaginationPage = () => {
    const { panelReRegistration } = getPanelReRegistration();

    const studentPanelPaginationContainer = document.querySelector('.student-panel-pagination-container');
    const studentPanelPaginationPageContainer = document.querySelector('.student-panel-pagination-pages');
    const totalPanelPages = Math.ceil(panelReRegistration.length / panelReRegistrationPerPagination);
    const numberActivePaginationPage = getNumberActivePaginationPage();

    studentPanelPaginationPageContainer.innerHTML = "";

    for (let numberPage = 1; numberPage <= totalPanelPages; numberPage++) {
        const panelPaginationPage = createStudentPanelManagementPaginationPage(numberPage);
        studentPanelPaginationPageContainer.appendChild(panelPaginationPage);

        if (numberPage === numberActivePaginationPage) {
            panelPaginationPage.classList.add('active-page');
        };
    };

    applySwiperToPaginationContainer();

    const studentPanelPaginationContainerSwiper = studentPanelPaginationContainer.swiper;
    if (studentPanelPaginationContainerSwiper) {
        const targetIndex = numberActivePaginationPage - 1;
        studentPanelPaginationContainerSwiper.slideTo(targetIndex, 0);
    };
};

export const initializeRenderPanelManagementPagination = () => {
    renderPanelManagementPagination();
    setNumberActivePaginationPage();
};