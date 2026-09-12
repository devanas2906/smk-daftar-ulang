import { createStudentPanelManagementTable, createStudentPanelManagementTableRow } from "../../components/panel/student-panel-content.js";

import { setStartEndPanelTableRow, getStartEndPanelTableRow } from "../../utilities/panel/panel-table-utils.js";
import { getPanelReRegistration, panelReRegistrationPerPagination } from "../../utilities/panel/panel-config.js";

const renderStudentPanelTable = () => {
    const studentDashboardManagementTableContainer = document.querySelector('.student-dashboard-management-table-container');
    const studentPanelManagementTable = createStudentPanelManagementTable();
    studentDashboardManagementTableContainer.appendChild(studentPanelManagementTable);
};

export const renderStudentPanelTableRow = () => {
    const { panelReRegistration } = getPanelReRegistration();
    const { start, end } = getStartEndPanelTableRow();

    const studentDashboardPanelManagementTableBody = document.querySelector('.student-dashboard-panel-management-table-body');
    studentDashboardPanelManagementTableBody.innerHTML = "";

    panelReRegistration
        .slice(start, end)
        .forEach(reRegistration => {
            const studentPanelManagementTableRow = createStudentPanelManagementTableRow(reRegistration);
            studentDashboardPanelManagementTableBody.appendChild(studentPanelManagementTableRow);
        });
};

export const initializeRenderStudentPanelTable = () => {
    renderStudentPanelTable();
    setStartEndPanelTableRow(0, panelReRegistrationPerPagination);
};