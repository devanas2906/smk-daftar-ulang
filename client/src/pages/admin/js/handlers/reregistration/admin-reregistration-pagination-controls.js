import { reRegistrationPerPagination } from "../../utilities/reregistration/reregistration-config.js";
import { setStartEndReRegistrationTableRow } from "../../utilities/reregistration/reregistration-table-utils.js";
import { setNumberActivePaginationPage } from "../../utilities/reregistration/reregistration-pagination-utils.js";

import { updateReRegistrationTableAndPagination } from "../../utilities/reregistration/update-reregistration-table-pagination.js";

const handleReRegistrationPaginationControlByButton = () => {
    document.body.addEventListener('click', (event) => {
        const adminReRegistrationPaginationButton = event.target.closest('.admin-reregistration-pagination-button');

        if (adminReRegistrationPaginationButton) {
            event.stopImmediatePropagation();

            const adminReRegistrationPaginationContainer = adminReRegistrationPaginationButton.parentElement.querySelector('.admin-reregistration-pagination-container');
            const adminReRegistrationPaginationContainerSwiper = adminReRegistrationPaginationContainer.swiper;

            const adminReRegistrationPaginationPageContainer = adminReRegistrationPaginationContainer.querySelector('.admin-reregistration-pagination-pages')
            const adminReRegistrationPaginationPages = adminReRegistrationPaginationPageContainer.querySelectorAll('.admin-reregistration-pagination-page');

            const activeReRegistrationPaginationPage = [...adminReRegistrationPaginationPages].find(page => page.classList.contains('active-page'));
            const siblingActiveReRegistrationPaginationPage = adminReRegistrationPaginationButton.classList.contains('admin-reregistration-pagination-previous-button')
                ? activeReRegistrationPaginationPage?.previousElementSibling : adminReRegistrationPaginationButton.classList.contains('admin-reregistration-pagination-next-button')
                    ? activeReRegistrationPaginationPage?.nextElementSibling : null;

            if (adminReRegistrationPaginationButton.classList.contains('admin-reregistration-pagination-previous-button')) {
                adminReRegistrationPaginationContainerSwiper.slidePrev();
            } else if (adminReRegistrationPaginationButton.classList.contains('admin-reregistration-pagination-next-button')) {
                adminReRegistrationPaginationContainerSwiper.slideNext();
            };

            if (!siblingActiveReRegistrationPaginationPage) return;

            adminReRegistrationPaginationPages.forEach(page => page.classList.remove('active-page'));
            siblingActiveReRegistrationPaginationPage?.classList.add('active-page');

            const numberPage = parseInt(siblingActiveReRegistrationPaginationPage.textContent);
            const start = (numberPage - 1) * reRegistrationPerPagination;
            const end = start + reRegistrationPerPagination;

            setStartEndReRegistrationTableRow(start, end);
            setNumberActivePaginationPage();

            updateReRegistrationTableAndPagination();
        };
    });
};

const handleReRegistrationPaginationControlByPage = () => {
    document.body.addEventListener('click', (event) => {
        const adminReRegistrationPaginationPage = event.target.closest('.admin-reregistration-pagination-page');

        if (adminReRegistrationPaginationPage) {
            event.stopImmediatePropagation();

            const adminReRegistrationPaginationContainer = adminReRegistrationPaginationPage.closest('.admin-reregistration-pagination-container');
            const adminReRegistrationPaginationContainerSwiper = adminReRegistrationPaginationContainer.swiper;

            const adminReRegistrationPaginationPageContainer = adminReRegistrationPaginationContainer.querySelector('.admin-reregistration-pagination-pages')
            const adminReRegistrationPaginationPages = adminReRegistrationPaginationPageContainer.querySelectorAll('.admin-reregistration-pagination-page');

            const visibleReRegistrationPaginationPages = [...adminReRegistrationPaginationPages].filter(page => {
                const pageRect = page.getBoundingClientRect();
                const containerRect = adminReRegistrationPaginationContainer.getBoundingClientRect();

                return pageRect.left >= containerRect.left && pageRect.right <= containerRect.right;
            }).filter((_, index) => index !== 2);

            visibleReRegistrationPaginationPages.forEach((page, index) => {
                if (page === adminReRegistrationPaginationPage) {
                    if (index === 0 || index === 1) {
                        adminReRegistrationPaginationContainerSwiper.slidePrev();
                    } else if (index === 2 || index === 3) {
                        adminReRegistrationPaginationContainerSwiper.slideNext();
                    };
                };
            });

            adminReRegistrationPaginationPages.forEach(page => page.classList.remove('active-page'));
            adminReRegistrationPaginationPage.classList.add('active-page');

            const numberPage = parseInt(adminReRegistrationPaginationPage.textContent);
            const start = (numberPage - 1) * reRegistrationPerPagination;
            const end = start + reRegistrationPerPagination;

            setStartEndReRegistrationTableRow(start, end);
            setNumberActivePaginationPage();

            updateReRegistrationTableAndPagination();
        };
    });
};

export const initializeHandleReRegistrationPaginationControls = () => {
    handleReRegistrationPaginationControlByButton();
    handleReRegistrationPaginationControlByPage();
};