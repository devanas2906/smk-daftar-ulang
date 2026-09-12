import { getSessionStorageItem } from "../../../common/js/auth.js";

import { updateActiveSidebarNavigationState } from "./utilities/sidebar-utils.js";
import { renderAdminContentBySession } from "./admin-content.js";

import { applySweetalert2Message } from "../../../common/js/utilities/sweetalert2.js";

export const handleAdminSidebarNavigation = () => {
    document.body.addEventListener('click', async (event) => {
        const adminDashboardSidebarItem = event.target.closest('.admin-dashboard-sidebar-item');

        if (adminDashboardSidebarItem) {
            const activePageSession = getSessionStorageItem('active-page-session');
            const adminDashboardSidebarKey = adminDashboardSidebarItem.dataset.key;

            if (adminDashboardSidebarKey === activePageSession) return;

            updateActiveSidebarNavigationState({ triggerBy: "click", newActivePageSession: adminDashboardSidebarKey });

            try {
                await renderAdminContentBySession();
            } catch (error) {
                applySweetalert2Message('error', "Gagal", error.message);
            };

        };
    });
};