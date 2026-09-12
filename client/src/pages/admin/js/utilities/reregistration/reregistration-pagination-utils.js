import { applySwiper } from "../../../../../common/js/utilities/swiper.js";

let numberActivePaginationPage = 1;

const swiperCustomOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesPerGroup: 2,
};

export const setNumberActivePaginationPage = () => {
    const adminReRegistrationPaginationPageContainer = document.querySelector('.admin-reregistration-pagination-pages');
    const adminReRegistrationPaginationPages = adminReRegistrationPaginationPageContainer.querySelectorAll('.admin-reregistration-pagination-page');
    const activeReRegistrationPaginationPage = [...adminReRegistrationPaginationPages].find(page => page.classList.contains('active-page'));
    const numberPage = activeReRegistrationPaginationPage ? parseInt(activeReRegistrationPaginationPage.textContent) : 1;

    numberActivePaginationPage = numberPage;
};

export const getNumberActivePaginationPage = () => numberActivePaginationPage;

export const applySwiperToPaginationContainer = () => {
    const adminReRegistrationPaginationContainer = document.querySelector('.admin-reregistration-pagination-container');
    applySwiper(adminReRegistrationPaginationContainer, swiperCustomOptions);
};