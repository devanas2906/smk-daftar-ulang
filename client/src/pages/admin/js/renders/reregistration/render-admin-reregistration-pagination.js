import { createAdminReRegistrationManagementPagination, createAdminReRegistrationManagementPaginationPage } from "../../components/reregistration/admin-reregistration-pagination.js";

import { getReRegistrations, reRegistrationPerPagination } from "../../utilities/reregistration/reregistration-config.js";
import { getStartEndReRegistrationTableRow } from "../../utilities/reregistration/reregistration-table-utils.js";
import { applySwiperToPaginationContainer, setNumberActivePaginationPage, getNumberActivePaginationPage } from "../../utilities/reregistration/reregistration-pagination-utils.js";

const renderReRegistrationManagementPagination = () => {
    const adminReRegistrationManagementContent = document.querySelector('.admin-dashboard-reregistration-management-content');
    const existingAdminReRegistrationPagination = adminReRegistrationManagementContent.querySelector('.admin-dashboard-management-reregistration-pagination');
    const adminReRegistrationPagination = createAdminReRegistrationManagementPagination();

    if (!existingAdminReRegistrationPagination) adminReRegistrationManagementContent.appendChild(adminReRegistrationPagination);
};

export const renderReRegistrationManagementPaginationInfo = () => {
    const { reRegistrations } = getReRegistrations();
    const { start, end } = getStartEndReRegistrationTableRow();

    const activeReRegistrations = reRegistrations.slice(start, end);

    const adminReRegistrationPaginationRange = document.querySelector('.admin-reregistration-pagination-range');
    const adminReRegistrationPaginationTotal = document.querySelector('.admin-reregistration-pagination-total');

    adminReRegistrationPaginationRange.textContent = activeReRegistrations.length < reRegistrationPerPagination ? `1-${activeReRegistrations.length}` : `1-${reRegistrationPerPagination}`;
    adminReRegistrationPaginationTotal.textContent = reRegistrations.length;
};

export const renderReRegistrationManagementPaginationPage = () => {
    const { reRegistrations } = getReRegistrations();

    const adminReRegistrationPaginationContainer = document.querySelector('.admin-reregistration-pagination-container');
    const adminReRegistrationPaginationPageContainer = document.querySelector('.admin-reregistration-pagination-pages');
    const totalReRegistrationPages = Math.ceil(reRegistrations.length / reRegistrationPerPagination);
    const numberActivePaginationPage = getNumberActivePaginationPage();

    adminReRegistrationPaginationPageContainer.innerHTML = "";

    for (let numberPage = 1; numberPage <= totalReRegistrationPages; numberPage++) {
        const reRegistrationPaginationPage = createAdminReRegistrationManagementPaginationPage(numberPage);
        adminReRegistrationPaginationPageContainer.appendChild(reRegistrationPaginationPage);

        if (numberPage === numberActivePaginationPage) {
            reRegistrationPaginationPage.classList.add('active-page');
        };
    };

    applySwiperToPaginationContainer();

    const adminReRegistrationPaginationContainerSwiper = adminReRegistrationPaginationContainer.swiper;
    if (adminReRegistrationPaginationContainerSwiper) {
        const targetIndex = numberActivePaginationPage - 1;
        adminReRegistrationPaginationContainerSwiper.slideTo(targetIndex, 0);
    };
};

export const initializeRenderReRegistrationManagementPagination = () => {
    renderReRegistrationManagementPagination();
    setNumberActivePaginationPage();
};