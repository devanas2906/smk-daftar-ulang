import { createAdminMasterDataManagementPagination, createAdminMasterDataManagementPaginationPage } from "../../components/master-data/admin-master-data-pagination.js";

import { getMasterData, getMasterDataKey } from "../../utilities/master-data/master-data-management-utils.js";
import { masterDataPerPagination } from "../../utilities/master-data/master-data-config.js";
import { getStartEndMasterDataTableRow } from "../../utilities/master-data/master-data-table-utils.js";
import { applySwiperToPaginationContainer, setNumberActivePaginationPage, getNumberActivePaginationPage } from "../../utilities/master-data/master-data-pagination-utils.js";

const renderMasterDataManagementPagination = () => {
    const adminMasterDataManagementContent = document.querySelector('.admin-dashboard-master-data-management-content');
    const existingAdminMasterDataPagination = adminMasterDataManagementContent.querySelector('.admin-dashboard-management-master-data-pagination');
    const adminMasterDataPagination = createAdminMasterDataManagementPagination();

    if (!existingAdminMasterDataPagination) adminMasterDataManagementContent.appendChild(adminMasterDataPagination);
};

export const renderMasterDataManagementPaginationInfo = () => {
    const masterDataKey = getMasterDataKey();
    const { [masterDataKey]: masterData } = getMasterData();

    const { start, end } = getStartEndMasterDataTableRow();
    const activeMasterData = masterData.slice(start, end);

    const adminMasterDataPaginationRange = document.querySelector('.admin-master-data-pagination-range');
    const adminMasterDataPaginationTotal = document.querySelector('.admin-master-data-pagination-total');

    adminMasterDataPaginationRange.textContent = activeMasterData.length < masterDataPerPagination ? `1-${activeMasterData.length}` : `1-${masterDataPerPagination}`;
    adminMasterDataPaginationTotal.textContent = masterData.length;
};

export const renderMasterDataManagementPaginationPage = () => {
    const masterDataKey = getMasterDataKey();
    const { [masterDataKey]: masterData } = getMasterData();

    const adminMasterDataPaginationContainer = document.querySelector('.admin-master-data-pagination-container');
    const adminMasterDataPaginationPageContainer = document.querySelector('.admin-master-data-pagination-pages');
    const totalMasterDataPages = Math.ceil(masterData.length / masterDataPerPagination);
    const numberActivePaginationPage = getNumberActivePaginationPage();

    adminMasterDataPaginationPageContainer.innerHTML = "";

    for (let numberPage = 1; numberPage <= totalMasterDataPages; numberPage++) {
        const masterDataPaginationPage = createAdminMasterDataManagementPaginationPage(numberPage);
        adminMasterDataPaginationPageContainer.appendChild(masterDataPaginationPage);

        if (numberPage === numberActivePaginationPage) {
            masterDataPaginationPage.classList.add('active-page');
        };
    };

    applySwiperToPaginationContainer();

    const adminMasterDataPaginationContainerSwiper = adminMasterDataPaginationContainer.swiper;
    if (adminMasterDataPaginationContainerSwiper) {
        const targetIndex = numberActivePaginationPage - 1;
        adminMasterDataPaginationContainerSwiper.slideTo(targetIndex, 0);
    };
};

export const initializeRenderMasterDataManagementPagination = () => {
    renderMasterDataManagementPagination();
    setNumberActivePaginationPage();
};