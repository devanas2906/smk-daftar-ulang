import { handleAdminReRegistrationModal } from "./admin-reregistration-modal.js";
import { initializeHandleAdminReRegistrationDecision } from "./admin-reregistration-decision.js";
import { handleAdminReRegistrationDelete } from "./admin-reregistration-delete.js";
import { initializeHandleReRegistrationPaginationControls } from "./admin-reregistration-pagination-controls.js";

export const initializeReRegistrationManagementHandlers = () => {
    handleAdminReRegistrationModal();
    initializeHandleAdminReRegistrationDecision();
    handleAdminReRegistrationDelete();
    initializeHandleReRegistrationPaginationControls();
};