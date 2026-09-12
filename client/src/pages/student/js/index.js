import { validateAuthAndRole } from '../../../common/js/auth.js';
import { validateRequireChangePassword, validateRejectedReRegistrationResult } from './utilities/student-auth-guard.js';

import { renderStudentDashboard } from "./renders/render-student-dashboard.js";
import { renderStudentContentBySession } from "./student-content.js";

import { updateActiveSidebarNavigationState } from "./utilities/sidebar-utils.js";
import { handleStudentSidebarNavigation } from "./student-sidebar-navigation.js";

import { handleDashboardSidebarToggle } from "../../../common/js/document-handler.js";
import { handleAfterPrintHandler } from "../../../common/js/print-handler.js";

import { applySweetalert2Message } from '../../../common/js/utilities/sweetalert2.js';

export const initializeStudentFrontend = async () => {
    try {
        const { isAuthorized } = await validateAuthAndRole("student");
        if (!isAuthorized) return;

        const { isRequireChangePassword } = await validateRequireChangePassword();
        if (isRequireChangePassword) return;

        const { isRejectedReRegistration } = await validateRejectedReRegistrationResult();
        if (isRejectedReRegistration) return;

        await renderStudentDashboard();
        await renderStudentContentBySession();

        updateActiveSidebarNavigationState({ triggerBy: "reload", newActivePageSession: null });
        handleStudentSidebarNavigation();

        handleDashboardSidebarToggle();
        handleAfterPrintHandler();
    } catch (error) {
        applySweetalert2Message("error", "Gagal", error.message);
    };
};