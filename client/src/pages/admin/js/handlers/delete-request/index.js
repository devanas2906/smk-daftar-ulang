import { initializeHandleAdminDeleteRequestDecision } from "./admin-delete-request-decision.js";
import { initializeHandleDeleteRequestPaginationControls } from "./admin-delete-request-pagination-controls.js";

export const initializeDeleteRequestManagementHandlers = () => {
    initializeHandleAdminDeleteRequestDecision();
    initializeHandleDeleteRequestPaginationControls();
};