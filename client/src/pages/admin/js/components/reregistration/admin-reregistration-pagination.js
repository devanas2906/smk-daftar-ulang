import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminReRegistrationManagementPagination = () => {
    return createElement(
        `<section class="pagination-component pagination-container admin-dashboard-management-pagination admin-dashboard-management-reregistration-pagination">
            <p class="pagination-info-component pagination-info admin-pagination-info admin-reregistration-pagination-info">Menampilkan <span class="pagination-range admin-pagination-range admin-reregistration-pagination-range">1-5</span> dari <span class="pagination-total admin-pagination-total admin-reregistration-pagination-total">120</span></p>

            <div class="pagination-controls-component pagination-controls admin-pagination-controls admin-reregistration-pagination-controls" aria-label="reregistration pagination">
                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-reregistration-pagination-button admin-reregistration-pagination-previous-button" aria-label="Previous page"><i class="fa-solid fa-caret-left"></i></button>

                <div class="swiper pagination-container-component pagination-container admin-pagination-container admin-reregistration-pagination-container">
                   <div class="swiper-wrapper pagination-pages-component pagination-pages admin-pagination-pages admin-reregistration-pagination-pages"></div>
                </div>

                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-reregistration-pagination-button admin-reregistration-pagination-next-button" aria-label="Next page"><i class="fa-solid fa-caret-right"></i></button>
            </div>
        </section>
        `
    );
};

export const createAdminReRegistrationManagementPaginationPage = (numberPage) => createElement(`<button type="button" class="swiper-slide pagination-page-component pagination-page admin-pagination-page admin-reregistration-pagination-page">${numberPage}</button>`);