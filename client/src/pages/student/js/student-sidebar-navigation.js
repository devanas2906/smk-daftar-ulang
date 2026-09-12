import { getSessionStorageItem } from "../../../common/js/auth.js";

import { updateActiveSidebarNavigationState } from "./utilities/sidebar-utils.js";
import { renderStudentContentBySession } from "./student-content.js";

import { applySweetalert2Message } from "../../../common/js/utilities/sweetalert2.js";

export const handleStudentSidebarNavigation = () => {
    document.body.addEventListener('click', async (event) => {
        const studentDashboardSidebarItem = event.target.closest('.student-dashboard-sidebar-item');

        if (studentDashboardSidebarItem) {
            const activePageSession = getSessionStorageItem('active-page-session');
            const studentDashboardSidebarKey = studentDashboardSidebarItem.dataset.key;

            if (studentDashboardSidebarKey === activePageSession) return;

            updateActiveSidebarNavigationState({ triggerBy: "click", newActivePageSession: studentDashboardSidebarKey });

            try {
                await renderStudentContentBySession();
            } catch (error) {
                applySweetalert2Message("error", "Gagal", error.message);
            };

        };
    });
};