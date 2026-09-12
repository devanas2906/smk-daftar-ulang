import { createElement } from "../../../../../common/js/component-utils.js";

export const createAdminMasterDataManagementPagination = () => {
    return createElement(
        `<section class="pagination-component pagination-container admin-dashboard-management-pagination admin-dashboard-management-master-data-pagination">
            <p class="pagination-info-component pagination-info admin-pagination-info admin-master-data-pagination-info">Menampilkan <span class="pagination-range admin-pagination-range admin-master-data-pagination-range">1-5</span> dari <span class="pagination-total admin-pagination-total admin-master-data-pagination-total">120</span></p>

            <div class="pagination-controls-component pagination-controls admin-pagination-controls admin-master-data-pagination-controls" aria-label="Master data pagination">
                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-master-data-pagination-button admin-master-data-pagination-previous-button" aria-label="Previous page"><i class="fa-solid fa-caret-left"></i></button>

                <div class="swiper pagination-container-component pagination-container admin-pagination-container admin-master-data-pagination-container">
                   <div class="swiper-wrapper pagination-pages-component pagination-pages admin-pagination-pages admin-master-data-pagination-pages"></div>
                </div>

                <button type="button" class="pagination-button-component pagination-button admin-pagination-button admin-master-data-pagination-button admin-master-data-pagination-next-button" aria-label="Next page"><i class="fa-solid fa-caret-right"></i></button>
            </div>
        </section>
        `
    );
};

export const createAdminMasterDataManagementPaginationPage = (numberPage) => createElement(`<button type="button" class="swiper-slide pagination-page-component pagination-page admin-pagination-page admin-master-data-pagination-page">${numberPage}</button>`);