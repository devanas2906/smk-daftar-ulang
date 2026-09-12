import { applySwiper } from "../../../../../common/js/utilities/swiper.js";

let numberActivePaginationPage = 1;

const swiperCustomOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesPerGroup: 2,
};

export const setNumberActivePaginationPage = () => {
    const adminMasterDataPaginationPageContainer = document.querySelector('.admin-master-data-pagination-pages');
    const adminMasterDataPaginationPages = adminMasterDataPaginationPageContainer.querySelectorAll('.admin-master-data-pagination-page');
    const activeMasterDataPaginationPage = [...adminMasterDataPaginationPages].find(page => page.classList.contains('active-page'));
    const numberPage = activeMasterDataPaginationPage ? parseInt(activeMasterDataPaginationPage.textContent) : 1;

    numberActivePaginationPage = numberPage;
};

export const getNumberActivePaginationPage = () => numberActivePaginationPage;

export const applySwiperToPaginationContainer = () => {
    const adminMasterDataPaginationContainer = document.querySelector('.admin-master-data-pagination-container');
    applySwiper(adminMasterDataPaginationContainer, swiperCustomOptions);
};