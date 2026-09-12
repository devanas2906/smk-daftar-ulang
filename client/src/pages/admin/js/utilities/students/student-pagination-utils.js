import { applySwiper } from "../../../../../common/js/utilities/swiper.js";

let numberActivePaginationPage = 1;

const swiperCustomOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    slidesPerGroup: 2,
};

export const setNumberActivePaginationPage = () => {
    const adminStudentPaginationPageContainer = document.querySelector('.admin-student-pagination-pages');
    const adminStudentPaginationPages = adminStudentPaginationPageContainer.querySelectorAll('.admin-student-pagination-page');
    const activeStudentPaginationPage = [...adminStudentPaginationPages].find(page => page.classList.contains('active-page'));
    const numberPage = activeStudentPaginationPage ? parseInt(activeStudentPaginationPage.textContent) : 1;

    numberActivePaginationPage = numberPage;
};

export const getNumberActivePaginationPage = () => numberActivePaginationPage;

export const applySwiperToPaginationContainer = () => {
    const adminStudentPaginationContainer = document.querySelector('.admin-student-pagination-container');
    applySwiper(adminStudentPaginationContainer, swiperCustomOptions);
};