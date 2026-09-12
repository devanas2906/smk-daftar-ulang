import { createElement } from "../../../../../common/js/component-utils.js";

export const createStudentPanelManagementPagination = () => {
    return createElement(
        `<section class="pagination-component pagination-container student-dashboard-management-pagination student-dashboard-management-panel-pagination">
            <p class="pagination-info-component pagination-info student-pagination-info student-panel-pagination-info">Menampilkan <span class="pagination-range student-pagination-range student-panel-pagination-range">1-5</span> dari <span class="pagination-total student-pagination-total student-panel-pagination-total">120</span></p>

            <div class="pagination-controls-component pagination-controls student-pagination-controls student-panel-pagination-controls" aria-label="Panel pagination">
                <button type="button" class="pagination-button-component pagination-button student-pagination-button student-panel-pagination-button student-panel-pagination-previous-button" aria-label="Previous page"><i class="fa-solid fa-caret-left"></i></button>

                <div class="swiper pagination-container-component pagination-container student-pagination-container student-panel-pagination-container">
                   <div class="swiper-wrapper pagination-pages-component pagination-pages student-pagination-pages student-panel-pagination-pages"></div>
                </div>

                <button type="button" class="pagination-button-component pagination-button student-pagination-button student-panel-pagination-button student-panel-pagination-next-button" aria-label="Next page"><i class="fa-solid fa-caret-right"></i></button>
            </div>
        </section>
        `
    );
};

export const createStudentPanelManagementPaginationPage = (numberPage) => createElement(`<button type="button" class="swiper-slide pagination-page-component pagination-page student-pagination-page student-panel-pagination-page">${numberPage}</button>`);