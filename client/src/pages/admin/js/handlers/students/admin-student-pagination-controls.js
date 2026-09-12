import { studentPerPagination } from "../../utilities/students/student-config.js";
import { setStartEndStudentTableRow } from "../../utilities/students/student-table-utils.js";
import { setNumberActivePaginationPage } from "../../utilities/students/student-pagination-utils.js";

import { updateStudentTableAndPagination } from "../../utilities/students/update-student-table-pagination.js";

const handleStudentPaginationControlByButton = () => {
    document.body.addEventListener('click', (event) => {
        const adminStudentPaginationButton = event.target.closest('.admin-student-pagination-button');

        if (adminStudentPaginationButton) {
            event.stopImmediatePropagation();

            const adminStudentPaginationContainer = adminStudentPaginationButton.parentElement.querySelector('.admin-student-pagination-container');
            const adminStudentPaginationContainerSwiper = adminStudentPaginationContainer.swiper;

            const adminStudentPaginationPageContainer = adminStudentPaginationContainer.querySelector('.admin-student-pagination-pages')
            const adminStudentPaginationPages = adminStudentPaginationPageContainer.querySelectorAll('.admin-student-pagination-page');

            const activeStudentPaginationPage = [...adminStudentPaginationPages].find(page => page.classList.contains('active-page'));
            const siblingActiveStudentPaginationPage = adminStudentPaginationButton.classList.contains('admin-student-pagination-previous-button')
                ? activeStudentPaginationPage?.previousElementSibling : adminStudentPaginationButton.classList.contains('admin-student-pagination-next-button')
                    ? activeStudentPaginationPage?.nextElementSibling : null;

            if (adminStudentPaginationButton.classList.contains('admin-student-pagination-previous-button')) {
                adminStudentPaginationContainerSwiper.slidePrev();
            } else if (adminStudentPaginationButton.classList.contains('admin-student-pagination-next-button')) {
                adminStudentPaginationContainerSwiper.slideNext();
            };

            if (!siblingActiveStudentPaginationPage) return;

            adminStudentPaginationPages.forEach(page => page.classList.remove('active-page'));
            siblingActiveStudentPaginationPage?.classList.add('active-page');

            const numberPage = parseInt(siblingActiveStudentPaginationPage.textContent);
            const start = (numberPage - 1) * studentPerPagination;
            const end = start + studentPerPagination;

            setStartEndStudentTableRow(start, end);
            setNumberActivePaginationPage();
            updateStudentTableAndPagination();
        };
    });
};

const handleStudentPaginationControlByPage = () => {
    document.body.addEventListener('click', (event) => {
        const adminStudentPaginationPage = event.target.closest('.admin-student-pagination-page');

        if (adminStudentPaginationPage) {
            event.stopImmediatePropagation();

            const adminStudentPaginationContainer = adminStudentPaginationPage.closest('.admin-student-pagination-container');
            const adminStudentPaginationContainerSwiper = adminStudentPaginationContainer.swiper;

            const adminStudentPaginationPageContainer = adminStudentPaginationContainer.querySelector('.admin-student-pagination-pages')
            const adminStudentPaginationPages = adminStudentPaginationPageContainer.querySelectorAll('.admin-student-pagination-page');

            const visibleStudentPaginationPages = [...adminStudentPaginationPages].filter(page => {
                const pageRect = page.getBoundingClientRect();
                const containerRect = adminStudentPaginationContainer.getBoundingClientRect();

                return pageRect.left >= containerRect.left && pageRect.right <= containerRect.right;
            }).filter((_, index) => index !== 2);

            visibleStudentPaginationPages.forEach((page, index) => {
                if (page === adminStudentPaginationPage) {
                    if (index === 0 || index === 1) {
                        adminStudentPaginationContainerSwiper.slidePrev();
                    } else if (index === 2 || index === 3) {
                        adminStudentPaginationContainerSwiper.slideNext();
                    };
                };
            });

            adminStudentPaginationPages.forEach(page => page.classList.remove('active-page'));
            adminStudentPaginationPage.classList.add('active-page');

            const numberPage = parseInt(adminStudentPaginationPage.textContent);
            const start = (numberPage - 1) * studentPerPagination;
            const end = start + studentPerPagination;

            setStartEndStudentTableRow(start, end);
            setNumberActivePaginationPage();
            updateStudentTableAndPagination();
        };
    });
};

export const initializeHandleStudentPaginationControls = () => {
    handleStudentPaginationControlByButton();
    handleStudentPaginationControlByPage();
};