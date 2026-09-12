import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminDeleteRequestManagementPagination = () => {
    return createElement(
        `<section class="pagination-component pagination-container admin-dashboard-management-pagination admin-dashboard-management-delete-request-pagination">
            <p class="pagination-info-component pagination-info admin-pagination-info admin-delete-request-pagination-info">Menampilkan <span class="pagination-range admin-pagination-range admin-delete-request-pagination-range">1-5</span> dari <span class="pagination-total admin-pagination-total admin-delete-request-pagination-total">120</span></p>

            <div class="pagination-controls-component pagination-controls admin-pagination-controls admin-delete-request-pagination-controls" aria-label="Delete request pagination">
                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-delete-request-pagination-button admin-delete-request-pagination-previous-button" aria-label="Previous page"><i class="fa-solid fa-caret-left"></i></button>

                <div class="swiper pagination-container-component pagination-container admin-pagination-container admin-delete-request-pagination-container">
                   <div class="swiper-wrapper pagination-pages-component pagination-pages admin-pagination-pages admin-delete-request-pagination-pages"></div>
                </div>

                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-delete-request-pagination-button admin-delete-request-pagination-next-button" aria-label="Next page"><i class="fa-solid fa-caret-right"></i></button>
            </div>
        </section>
        `
    );
};

export const createAdminDeleteRequestManagementPaginationPage = (numberPage) => createElement(`<button type="button" class="swiper-slide pagination-page-component pagination-page admin-pagination-page admin-delete-request-pagination-page">${numberPage}</button>`);