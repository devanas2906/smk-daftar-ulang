import { panelReRegistrationPerPagination } from "../../utilities/panel/panel-config.js";
import { setStartEndPanelTableRow } from "../../utilities/panel/panel-table-utils.js";
import { setNumberActivePaginationPage } from "../../utilities/panel/panel-pagination-utils.js";

import { updatePanelTableAndPagination } from "../../utilities/panel/update-panel-table-pagination.js";

const handlePanelPaginationControlByButton = () => {
    document.body.addEventListener('click', (event) => {
        const studentPanelPaginationButton = event.target.closest('.student-panel-pagination-button');

        if (studentPanelPaginationButton) {
            event.stopImmediatePropagation();

            const studentPanelPaginationContainer = studentPanelPaginationButton.parentElement.querySelector('.student-panel-pagination-container');
            const studentPanelPaginationContainerSwiper = studentPanelPaginationContainer.swiper;

            const studentPanelPaginationPageContainer = studentPanelPaginationContainer.querySelector('.student-panel-pagination-pages')
            const studentPanelPaginationPages = studentPanelPaginationPageContainer.querySelectorAll('.student-panel-pagination-page');

            const studentPanelPaginationPage = [...studentPanelPaginationPages].find(page => page.classList.contains('active-page'));
            const siblingStudentPanelPaginationPage = studentPanelPaginationButton.classList.contains('student-panel-pagination-previous-button')
                ? studentPanelPaginationPage?.previousElementSibling : studentPanelPaginationButton.classList.contains('student-panel-pagination-next-button')
                    ? studentPanelPaginationPage?.nextElementSibling : null;

            if (studentPanelPaginationButton.classList.contains('student-panel-pagination-previous-button')) {
                studentPanelPaginationContainerSwiper.slidePrev();
            } else if (studentPanelPaginationButton.classList.contains('student-panel-pagination-next-button')) {
                studentPanelPaginationContainerSwiper.slideNext();
            };

            if (!siblingStudentPanelPaginationPage) return;

            studentPanelPaginationPages.forEach(page => page.classList.remove('active-page'));
            siblingStudentPanelPaginationPage?.classList.add('active-page');

            const numberPage = parseInt(siblingStudentPanelPaginationPage.textContent);
            const start = (numberPage - 1) * panelReRegistrationPerPagination;
            const end = start + panelReRegistrationPerPagination;

            setStartEndPanelTableRow(start, end);
            setNumberActivePaginationPage();

            updatePanelTableAndPagination();
        };
    });
};

const handlePanelPaginationControlByPage = () => {
    document.body.addEventListener('click', (event) => {
        const studentPanelPaginationPage = event.target.closest('.student-panel-pagination-page');

        if (studentPanelPaginationPage) {
            event.stopImmediatePropagation();

            const studentPanelPaginationContainer = studentPanelPaginationPage.closest('.student-panel-pagination-container');
            const studentPanelPaginationContainerSwiper = studentPanelPaginationContainer.swiper;

            const studentPanelPaginationPageContainer = studentPanelPaginationContainer.querySelector('.student-panel-pagination-pages')
            const studentPanelPaginationPages = studentPanelPaginationPageContainer.querySelectorAll('.student-panel-pagination-page');

            const visiblePanelPaginationPages = [...studentPanelPaginationPages].filter(page => {
                const pageRect = page.getBoundingClientRect();
                const containerRect = studentPanelPaginationContainer.getBoundingClientRect();

                return pageRect.left >= containerRect.left && pageRect.right <= containerRect.right;
            }).filter((_, index) => index !== 2);

            visiblePanelPaginationPages.forEach((page, index) => {
                if (page === studentPanelPaginationPage) {
                    if (index === 0 || index === 1) {
                        studentPanelPaginationContainerSwiper.slidePrev();
                    } else if (index === 2 || index === 3) {
                        studentPanelPaginationContainerSwiper.slideNext();
                    };
                };
            });

            studentPanelPaginationPages.forEach(page => page.classList.remove('active-page'));
            studentPanelPaginationPage.classList.add('active-page');

            const numberPage = parseInt(studentPanelPaginationPage.textContent);
            const start = (numberPage - 1) * panelReRegistrationPerPagination;
            const end = start + panelReRegistrationPerPagination;

            setStartEndPanelTableRow(start, end);
            setNumberActivePaginationPage();

            updatePanelTableAndPagination();
        };
    });
};

export const initializeHandlePanelPaginationControls = () => {
    handlePanelPaginationControlByButton();
    handlePanelPaginationControlByPage();
};