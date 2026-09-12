import { handleStudentPanelReRegistrationModal, handleStudentPanelReRegistrationModalForm } from "./student-panel-modal.js";
import { handleStudentPanelPrint } from "./student-panel-print.js";
import { initializeHandlePanelPaginationControls } from "./student-panel-pagination-controls.js";
import { handleStudentRequestDeleteAccount } from "./student-panel-delete-account.js";

export const initializePanelManagementHandlers = () => {
    handleStudentPanelReRegistrationModal();
    handleStudentPanelReRegistrationModalForm();
    handleStudentPanelPrint();
    initializeHandlePanelPaginationControls();
    handleStudentRequestDeleteAccount();
};