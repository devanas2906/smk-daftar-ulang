import { setMasterData } from "../../utilities/master-data/master-data-management-utils.js";
import { setReRegistrations } from "../../utilities/reregistration/reregistration-config.js";

import { renderAdminReRegistrationManagementContent } from "./render-admin-reregistration-management.js";
import { initializeRenderAdminReRegistrationTable } from "./render-admin-reregistration-table.js";
import { initializeRenderReRegistrationManagementPagination } from "./render-admin-reregistration-pagination.js";

import { updateReRegistrationTableAndPagination } from "../../utilities/reregistration/update-reregistration-table-pagination.js";

export const initializeRenderReRegistrationManagement = async () => {
    await setMasterData("class");
    await setReRegistrations("");

    renderAdminReRegistrationManagementContent();
    initializeRenderAdminReRegistrationTable();
    initializeRenderReRegistrationManagementPagination();

    updateReRegistrationTableAndPagination();
};