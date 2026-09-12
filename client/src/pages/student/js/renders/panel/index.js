import { setPanelReRegistration } from "../../utilities/panel/panel-config.js";

import { renderStudentPanelManagementContent } from "./render-student-panel-management.js";
import { initializeRenderStudentPanelTable } from "./render-student-panel-table.js";
import { initializeRenderPanelManagementPagination } from "./render-student-panel-pagination.js";

import { updatePanelTableAndPagination } from "../../utilities/panel/update-panel-table-pagination.js";

export const initializeRenderPanelManagement = async () => {
    await setPanelReRegistration();

    renderStudentPanelManagementContent();
    initializeRenderStudentPanelTable();
    initializeRenderPanelManagementPagination();

    updatePanelTableAndPagination();
};