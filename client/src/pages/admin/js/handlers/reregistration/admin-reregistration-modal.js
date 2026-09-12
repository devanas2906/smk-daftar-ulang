import { createAdminReRegistrationModal } from "../../components/reregistration/admin-reregistration-modal.js";

import { reRegistrationTableRowPrivateData } from "../../utilities/reregistration/reregistration-management-utils.js";
import { setActiveDataDocumentId } from "../../utilities/modal-utils.js";

import * as api from "../../admin-api.js";

import { applySweetalert2Message } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleAdminReRegistrationModal = () => {
    document.body.addEventListener('click', async function (event) {
        const reveiewDocumentButton = event.target.closest('.admin-dashboard-reregistration-management-action-review-button');

        if (reveiewDocumentButton) {
            event.stopImmediatePropagation();

            try {
                const { reRegistrations } = await api.getReRegistrations();
                const adminReRegistrationTableRow = reveiewDocumentButton.closest('.admin-dashboard-reregistration-management-table-row');
                const { reRegistrationDocumentId } = reRegistrationTableRowPrivateData.get(adminReRegistrationTableRow);

                const findReRegistrationDocument = reRegistrations.find(reRegistration => reRegistration._id === reRegistrationDocumentId);

                const adminReRegistrationModal = createAdminReRegistrationModal(findReRegistrationDocument);
                this.appendChild(adminReRegistrationModal);
                this.classList.add('overflow-hidden');

                setActiveDataDocumentId(reRegistrationDocumentId);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};