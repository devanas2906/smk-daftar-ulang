import { validateAuthAndRole } from '../../../common/js/auth.js';

import { renderAdminDashboard } from "./renders/render-admin-dashboard.js";
import { renderAdminContentBySession } from "./admin-content.js"

import { updateActiveSidebarNavigationState } from "./utilities/sidebar-utils.js";
import { handleAdminSidebarNavigation } from "./admin-sidebar-navigation.js";

import { handleDashboardSidebarToggle } from "../../../common/js/document-handler.js";
import { handleAfterPrintHandler } from "../../../common/js/print-handler.js";

import { applySweetalert2Message } from "../../../common/js/utilities/sweetalert2.js";

export const initializeAdminFrontend = async () => {
    try {
        const { isAuthorized } = await validateAuthAndRole("admin");
        if (!isAuthorized) return;

        renderAdminDashboard();
        await renderAdminContentBySession();

        updateActiveSidebarNavigationState({ triggerBy: "reload", newActivePageSession: null });
        handleAdminSidebarNavigation();

        handleDashboardSidebarToggle();
        handleAfterPrintHandler();
    } catch (error) {
        applySweetalert2Message("error", "Gagal", error.message);
    };
};