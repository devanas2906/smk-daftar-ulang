import { masterDataPerPagination } from "../../utilities/master-data/master-data-config.js";
import { setStartEndMasterDataTableRow } from "../../utilities/master-data/master-data-table-utils.js";
import { setNumberActivePaginationPage } from "../../utilities/master-data/master-data-pagination-utils.js";

import { updateMasterDataTableAndPagination } from "../../utilities/master-data/update-master-data-table-pagination.js";

const handleMasterDataPaginationControlByButton = () => {
    document.body.addEventListener('click', (event) => {
        const adminMasterDataPaginationButton = event.target.closest('.admin-master-data-pagination-button');

        if (adminMasterDataPaginationButton) {
            event.stopImmediatePropagation();

            const adminMasterDataPaginationContainer = adminMasterDataPaginationButton.parentElement.querySelector('.admin-master-data-pagination-container');
            const adminMasterDataPaginationContainerSwiper = adminMasterDataPaginationContainer.swiper;

            const adminMasterDataPaginationPageContainer = adminMasterDataPaginationContainer.querySelector('.admin-master-data-pagination-pages')
            const adminMasterDataPaginationPages = adminMasterDataPaginationPageContainer.querySelectorAll('.admin-master-data-pagination-page');

            const activeMasterDataPaginationPage = [...adminMasterDataPaginationPages].find(page => page.classList.contains('active-page'));
            const siblingActiveMasterDataPaginationPage = adminMasterDataPaginationButton.classList.contains('admin-master-data-pagination-previous-button')
                ? activeMasterDataPaginationPage?.previousElementSibling : adminMasterDataPaginationButton.classList.contains('admin-master-data-pagination-next-button')
                    ? activeMasterDataPaginationPage?.nextElementSibling : null;

            if (adminMasterDataPaginationButton.classList.contains('admin-master-data-pagination-previous-button')) {
                adminMasterDataPaginationContainerSwiper.slidePrev();
            } else if (adminMasterDataPaginationButton.classList.contains('admin-master-data-pagination-next-button')) {
                adminMasterDataPaginationContainerSwiper.slideNext();
            };

            if (!siblingActiveMasterDataPaginationPage) return;

            adminMasterDataPaginationPages.forEach(page => page.classList.remove('active-page'));
            siblingActiveMasterDataPaginationPage?.classList.add('active-page');

            const numberPage = parseInt(siblingActiveMasterDataPaginationPage.textContent);
            const start = (numberPage - 1) * masterDataPerPagination;
            const end = start + masterDataPerPagination;

            setStartEndMasterDataTableRow(start, end);
            setNumberActivePaginationPage();

            updateMasterDataTableAndPagination();
        };
    });
};

const handleMasterDataPaginationControlByPage = () => {
    document.body.addEventListener('click', (event) => {
        const adminMasterDataPaginationPage = event.target.closest('.admin-master-data-pagination-page');

        if (adminMasterDataPaginationPage) {
            event.stopImmediatePropagation();

            const adminMasterDataPaginationContainer = adminMasterDataPaginationPage.closest('.admin-master-data-pagination-container');
            const adminMasterDataPaginationContainerSwiper = adminMasterDataPaginationContainer.swiper;

            const adminMasterDataPaginationPageContainer = adminMasterDataPaginationContainer.querySelector('.admin-master-data-pagination-pages')
            const adminMasterDataPaginationPages = adminMasterDataPaginationPageContainer.querySelectorAll('.admin-master-data-pagination-page');

            const visibleMasterDataPaginationPages = [...adminMasterDataPaginationPages].filter(page => {
                const pageRect = page.getBoundingClientRect();
                const containerRect = adminMasterDataPaginationContainer.getBoundingClientRect();

                return pageRect.left >= containerRect.left && pageRect.right <= containerRect.right;
            }).filter((_, index) => index !== 2);

            visibleMasterDataPaginationPages.forEach((page, index) => {
                if (page === adminMasterDataPaginationPage) {
                    if (index === 0 || index === 1) {
                        adminMasterDataPaginationContainerSwiper.slidePrev();
                    } else if (index === 2 || index === 3) {
                        adminMasterDataPaginationContainerSwiper.slideNext();
                    };
                };
            });

            adminMasterDataPaginationPages.forEach(page => page.classList.remove('active-page'));
            adminMasterDataPaginationPage.classList.add('active-page');

            const numberPage = parseInt(adminMasterDataPaginationPage.textContent);
            const start = (numberPage - 1) * masterDataPerPagination;
            const end = start + masterDataPerPagination;

            setStartEndMasterDataTableRow(start, end);
            setNumberActivePaginationPage();

            updateMasterDataTableAndPagination();
        };
    });
};

export const initializeHandleMasterDataPaginationControls = () => {
    handleMasterDataPaginationControlByButton();
    handleMasterDataPaginationControlByPage();
};