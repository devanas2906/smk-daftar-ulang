import { applySwiper } from "../../../../../common/js/utilities/swiper.js";

let numberActivePaginationPage = 1;

const swiperCustomOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesPerGroup: 2,
};

export const setNumberActivePaginationPage = () => {
    const studentPanelPaginationPageContainer = document.querySelector('.student-panel-pagination-pages');
    const studentPanelPaginationPages = studentPanelPaginationPageContainer.querySelectorAll('.student-panel-pagination-page');
    const activePanelPaginationPage = [...studentPanelPaginationPages].find(page => page.classList.contains('active-page'));
    const numberPage = activePanelPaginationPage ? parseInt(activePanelPaginationPage.textContent) : 1;

    numberActivePaginationPage = numberPage;
};

export const getNumberActivePaginationPage = () => numberActivePaginationPage;

export const applySwiperToPaginationContainer = () => {
    const studentPanelPaginationContainer = document.querySelector('.student-panel-pagination-container');
    applySwiper(studentPanelPaginationContainer, swiperCustomOptions);
};