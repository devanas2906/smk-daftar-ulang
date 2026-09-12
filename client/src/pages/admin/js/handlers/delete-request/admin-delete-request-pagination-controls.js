import { deleteRequestPerPagination } from "../../utilities/delete-request/delete-request-config.js";
import { setStartEndDeleteRequestTableRow } from "../../utilities/delete-request/delete-request-table-utils.js";
import { setNumberActivePaginationPage } from "../../utilities/delete-request/delete-request-pagination-utils.js";

import { updateDeleteRequestTableAndPagination } from "../../utilities/delete-request/update-delete-request-table-pagination.js";

const handleDeleteRequestPaginationControlByButton = () => {
    document.body.addEventListener('click', (event) => {
        const adminDeleteRequestPaginationButton = event.target.closest('.admin-delete-request-pagination-button');

        if (adminDeleteRequestPaginationButton) {
            event.stopImmediatePropagation();

            const adminDeleteRequestPaginationContainer = adminDeleteRequestPaginationButton.parentElement.querySelector('.admin-delete-request-pagination-container');
            const adminDeleteRequestPaginationContainerSwiper = adminDeleteRequestPaginationContainer.swiper;

            const adminDeleteRequestPaginationPageContainer = adminDeleteRequestPaginationContainer.querySelector('.admin-delete-request-pagination-pages')
            const adminDeleteRequestPaginationPages = adminDeleteRequestPaginationPageContainer.querySelectorAll('.admin-delete-request-pagination-page');

            const activeDeleteRequestPaginationPage = [...adminDeleteRequestPaginationPages].find(page => page.classList.contains('active-page'));
            const siblingActiveDeleteRequestPaginationPage = adminDeleteRequestPaginationButton.classList.contains('admin-delete-request-pagination-previous-button')
                ? activeDeleteRequestPaginationPage?.previousElementSibling : adminDeleteRequestPaginationButton.classList.contains('admin-delete-request-pagination-next-button')
                    ? activeDeleteRequestPaginationPage?.nextElementSibling : null;

            if (adminDeleteRequestPaginationButton.classList.contains('admin-delete-request-pagination-previous-button')) {
                adminDeleteRequestPaginationContainerSwiper.slidePrev();
            } else if (adminDeleteRequestPaginationButton.classList.contains('admin-delete-request-pagination-next-button')) {
                adminDeleteRequestPaginationContainerSwiper.slideNext();
            };

            if (!siblingActiveDeleteRequestPaginationPage) return;

            adminDeleteRequestPaginationPages.forEach(page => page.classList.remove('active-page'));
            siblingActiveDeleteRequestPaginationPage?.classList.add('active-page');

            const numberPage = parseInt(siblingActiveDeleteRequestPaginationPage.textContent);
            const start = (numberPage - 1) * deleteRequestPerPagination;
            const end = start + deleteRequestPerPagination;

            setStartEndDeleteRequestTableRow(start, end);
            setNumberActivePaginationPage();

            updateDeleteRequestTableAndPagination();
        };
    });
};

const handleDeleteRequestPaginationControlByPage = () => {
    document.body.addEventListener('click', (event) => {
        const adminDeleteRequestPaginationPage = event.target.closest('.admin-delete-request-pagination-page');

        if (adminDeleteRequestPaginationPage) {
            event.stopImmediatePropagation();

            const adminDeleteRequestPaginationContainer = adminDeleteRequestPaginationPage.closest('.admin-delete-request-pagination-container');
            const adminDeleteRequestPaginationContainerSwiper = adminDeleteRequestPaginationContainer.swiper;

            const adminDeleteRequestPaginationPageContainer = adminDeleteRequestPaginationContainer.querySelector('.admin-delete-request-pagination-pages')
            const adminDeleteRequestPaginationPages = adminDeleteRequestPaginationPageContainer.querySelectorAll('.admin-delete-request-pagination-page');

            const visibleDeleteRequestPaginationPages = [...adminDeleteRequestPaginationPages].filter(page => {
                const pageRect = page.getBoundingClientRect();
                const containerRect = adminDeleteRequestPaginationContainer.getBoundingClientRect();

                return pageRect.left >= containerRect.left && pageRect.right <= containerRect.right;
            }).filter((_, index) => index !== 2);

            visibleDeleteRequestPaginationPages.forEach((page, index) => {
                if (page === adminDeleteRequestPaginationPage) {
                    if (index === 0 || index === 1) {
                        adminDeleteRequestPaginationContainerSwiper.slidePrev();
                    } else if (index === 2 || index === 3) {
                        adminDeleteRequestPaginationContainerSwiper.slideNext();
                    };
                };
            });

            adminDeleteRequestPaginationPages.forEach(page => page.classList.remove('active-page'));
            adminDeleteRequestPaginationPage.classList.add('active-page');

            const numberPage = parseInt(adminDeleteRequestPaginationPage.textContent);
            const start = (numberPage - 1) * deleteRequestPerPagination;
            const end = start + deleteRequestPerPagination;

            setStartEndDeleteRequestTableRow(start, end);
            setNumberActivePaginationPage();

            updateDeleteRequestTableAndPagination();
        };
    });
};

export const initializeHandleDeleteRequestPaginationControls = () => {
    handleDeleteRequestPaginationControlByButton();
    handleDeleteRequestPaginationControlByPage();
};