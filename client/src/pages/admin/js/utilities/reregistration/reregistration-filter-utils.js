import { getReRegistrationFilterStatus } from "./reregistration-management-utils.js";

import { setReRegistrations, reRegistrationPerPagination } from "./reregistration-config.js";
import { setStartEndReRegistrationTableRow } from "./reregistration-table-utils.js";
import { setNumberActivePaginationPage } from "./reregistration-pagination-utils.js";
import { updateReRegistrationTableAndPagination } from "./update-reregistration-table-pagination.js";

export const resetAndUpdateReRegistrationByFilter = async () => {
    const reRegistrationStatus = getReRegistrationFilterStatus();
    await setReRegistrations(reRegistrationStatus);

    const adminReRegistrationPaginationPages = document.querySelectorAll('.admin-reregistration-pagination-page');
    const firstAdminReRegistrationPaginationPage = adminReRegistrationPaginationPages[0];

    adminReRegistrationPaginationPages.forEach(reRegistrationPage => reRegistrationPage.classList.remove('active-page'));
    firstAdminReRegistrationPaginationPage?.classList.remove('active-page');
    setStartEndReRegistrationTableRow(0, reRegistrationPerPagination);
    setNumberActivePaginationPage();

    updateReRegistrationTableAndPagination();
};