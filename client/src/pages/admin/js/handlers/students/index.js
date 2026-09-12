import { handleAdminStudentModal, handleAdminStudentModalForm } from "./admin-student-modal.js";
import { initializeHandleStudentPaginationControls } from "./admin-student-pagination-controls.js";

export const initializeStudentManagementHandlers = () => {
    handleAdminStudentModal();
    handleAdminStudentModalForm();
    initializeHandleStudentPaginationControls();
};