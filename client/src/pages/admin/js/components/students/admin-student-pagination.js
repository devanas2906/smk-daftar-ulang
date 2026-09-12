import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminStudentManagementPagination = () => {
    return createElement(
        `<section class="pagination-component pagination-container admin-dashboard-management-pagination admin-dashboard-management-student-pagination">
            <p class="pagination-info-component pagination-info admin-pagination-info admin-student-pagination-info">Menampilkan <span class="pagination-range admin-pagination-range admin-student-pagination-range">1-5</span> dari <span class="pagination-total admin-pagination-total admin-student-pagination-total">120</span></p>

            <div class="pagination-controls-component pagination-controls admin-pagination-controls admin-student-pagination-controls" aria-label="Student pagination">
                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-student-pagination-button admin-student-pagination-previous-button" aria-label="Previous page"><i class="fa-solid fa-caret-left"></i></button>

                <div class="swiper pagination-container-component pagination-container admin-pagination-container admin-student-pagination-container">
                   <div class="swiper-wrapper pagination-pages-component pagination-pages admin-pagination-pages admin-student-pagination-pages"></div>
                </div>

                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-student-pagination-button admin-student-pagination-next-button" aria-label="Next page"><i class="fa-solid fa-caret-right"></i></button>
            </div>
        </section>
        `
    );
};

export const createAdminStudentManagementPaginationPage = (numberPage) => createElement(`<button type="button" class="swiper-slide pagination-page-component pagination-page admin-pagination-page admin-student-pagination-page">${numberPage}</button>`);