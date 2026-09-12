import { applySwiper } from "../../../../../common/js/utilities/swiper.js";

let numberActivePaginationPage = 1;

const swiperCustomOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesPerGroup: 2,
};

export const setNumberActivePaginationPage = () => {
    const adminDeleteRequestPaginationPageContainer = document.querySelector('.admin-delete-request-pagination-pages');
    const adminDeleteRequestPaginationPages = adminDeleteRequestPaginationPageContainer.querySelectorAll('.admin-delete-request-pagination-page');
    const activeDeleteRequestPaginationPage = [...adminDeleteRequestPaginationPages].find(page => page.classList.contains('active-page'));
    const numberPage = activeDeleteRequestPaginationPage ? parseInt(activeDeleteRequestPaginationPage.textContent) : 1;

    numberActivePaginationPage = numberPage;
};

export const getNumberActivePaginationPage = () => numberActivePaginationPage;

export const applySwiperToPaginationContainer = () => {
    const adminDeleteRequestPaginationContainer = document.querySelector('.admin-delete-request-pagination-container');
    applySwiper(adminDeleteRequestPaginationContainer, swiperCustomOptions);
};