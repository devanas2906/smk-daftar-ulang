import { setSessionStorageItem, getSessionStorageItem } from "../../../common/js/auth.js";

// renders & handles panel management
import { initializeRenderPanelManagement } from "./renders/panel/index.js";
import { initializePanelManagementHandlers } from "./handlers/panel/index.js";

// renders & handles notification management
import { initializeRenderNotificationManagement } from "./renders/notification/index.js";
import { initializeNotificationManagementHandlers } from "./handlers/notification/index.js";

// renders & handles settings management
import { initializeRenderSettingsManagement } from "./renders/settings/index.js";
import { initializeSettingsManagementHandlers } from "./handlers/settings/index.js";

export const renderStudentContentBySession = async () => {
    const activePageSession = getSessionStorageItem('active-page-session');

    if (!activePageSession) {
        setSessionStorageItem('active-page-session', 'dashboard');
        await initializeRenderPanelManagement();
        initializePanelManagementHandlers();
        return;
    };

    switch (activePageSession) {
        case "notification": {
            initializeRenderNotificationManagement();
            initializeNotificationManagementHandlers();
            break
        };
        case "settings": {
            await initializeRenderSettingsManagement();
            initializeSettingsManagementHandlers();
            break
        };
        default: {
            await initializeRenderPanelManagement();
            initializePanelManagementHandlers();
        };

    };
};