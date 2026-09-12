import { createPrintReceipt } from "../../components/panel/student-panel-print.js";
import { panelReRegistrationTableRowPrivateData } from "../../utilities/panel/panel-management-utils.js";

import * as api from "../../student-api.js";

import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentPanelPrint = () => {
    document.body.addEventListener('click', async function (event) {
        const printDocumentButton = event.target.closest('.student-dashboard-panel-management-action-print-button');

        if (printDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const { student } = await api.getProfile();
                const { reRegistrations } = await api.getReRegistrations();
                const studentPanelReRegistrationTableRow = printDocumentButton.closest('.student-dashboard-panel-management-table-row');
                const { panelReRegistrationDocumentId } = panelReRegistrationTableRowPrivateData.get(studentPanelReRegistrationTableRow);

                const findReRegistrationDocument = reRegistrations.find(reRegistration => reRegistration._id === panelReRegistrationDocumentId);

                const printReceipt = await createPrintReceipt(findReRegistrationDocument, student);
                this.appendChild(printReceipt);
                window.print();
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};