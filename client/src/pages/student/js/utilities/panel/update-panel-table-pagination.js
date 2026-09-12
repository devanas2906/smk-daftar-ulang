import { renderStudentPanelTableRow } from "../../renders/panel/render-student-panel-table.js";
import { renderPanelManagementPaginationInfo, renderPanelManagementPaginationPage } from "../../renders/panel/render-student-panel-pagination.js";

import { getPanelReRegistration } from "./panel-config.js";

import { updateManagementContentState } from "../render-utils.js";

export const updatePanelTableAndPagination = () => {
    const { panelReRegistration } = getPanelReRegistration();

    renderStudentPanelTableRow();
    renderPanelManagementPaginationInfo();
    renderPanelManagementPaginationPage();

    updateManagementContentState(panelReRegistration.length, "Tidak ada data riwayat daftar ulang.");
};