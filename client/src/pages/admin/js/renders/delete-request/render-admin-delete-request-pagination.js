import { createAdminDeleteRequestManagementPagination, createAdminDeleteRequestManagementPaginationPage } from "../../components/delete-request/admin-delete-request-pagination.js";

import { getDeleteRequests, deleteRequestPerPagination } from "../../utilities/delete-request/delete-request-config.js";
import { getStartEndDeleteRequestTableRow } from "../../utilities/delete-request/delete-request-table-utils.js";
import { applySwiperToPaginationContainer, setNumberActivePaginationPage, getNumberActivePaginationPage } from "../../utilities/delete-request/delete-request-pagination-utils.js";

const renderDeleteRequestManagementPagination = () => {
    const adminDeleteRequestManagementContent = document.querySelector('.admin-dashboard-delete-request-management-content');
    const existingAdminDeleteRequestPagination = adminDeleteRequestManagementContent.querySelector('.admin-dashboard-management-delete-request-pagination');
    const adminDeleteRequestPagination = createAdminDeleteRequestManagementPagination();

    if (!existingAdminDeleteRequestPagination) adminDeleteRequestManagementContent.appendChild(adminDeleteRequestPagination);
};

export const renderDeleteRequestManagementPaginationInfo = () => {
    const { deleteRequests } = getDeleteRequests();
    const { start, end } = getStartEndDeleteRequestTableRow();

    const activeDeleteRequests = deleteRequests.slice(start, end);

    const adminDeleteRequestPaginationRange = document.querySelector('.admin-delete-request-pagination-range');
    const adminDeleteRequestPaginationTotal = document.querySelector('.admin-delete-request-pagination-total');

    adminDeleteRequestPaginationRange.textContent = activeDeleteRequests.length < deleteRequestPerPagination ? `1-${activeDeleteRequests.length}` : `1-${deleteRequestPerPagination}`;
    adminDeleteRequestPaginationTotal.textContent = deleteRequests.length;
};

export const renderDeleteRequestManagementPaginationPage = () => {
    const { deleteRequests } = getDeleteRequests();

    const adminDeleteRequestPaginationContainer = document.querySelector('.admin-delete-request-pagination-container');
    const adminDeleteRequestPaginationPageContainer = document.querySelector('.admin-delete-request-pagination-pages');
    const totalDeleteRequestPages = Math.ceil(deleteRequests.length / deleteRequestPerPagination);
    const numberActivePaginationPage = getNumberActivePaginationPage();

    adminDeleteRequestPaginationPageContainer.innerHTML = "";

    for (let numberPage = 1; numberPage <= totalDeleteRequestPages; numberPage++) {
        const deleteRequestPaginationPage = createAdminDeleteRequestManagementPaginationPage(numberPage);
        adminDeleteRequestPaginationPageContainer.appendChild(deleteRequestPaginationPage);

        if (numberPage === numberActivePaginationPage) {
            deleteRequestPaginationPage.classList.add('active-page');
        };
    };

    applySwiperToPaginationContainer();

    const adminDeleteRequestPaginationContainerSwiper = adminDeleteRequestPaginationContainer.swiper;
    if (adminDeleteRequestPaginationContainerSwiper) {
        const targetIndex = numberActivePaginationPage - 1;
        adminDeleteRequestPaginationContainerSwiper.slideTo(targetIndex, 0);
    };
};

export const initializeRenderDeleteRequestManagementPagination = () => {
    renderDeleteRequestManagementPagination();
    setNumberActivePaginationPage();
};