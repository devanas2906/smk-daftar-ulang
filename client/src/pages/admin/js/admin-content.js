import { setSessionStorageItem, getSessionStorageItem } from "../../../common/js/auth.js";

// renders & handles student management
import { initializeRenderStudentManagement } from "./renders/students/index.js";
import { initializeStudentManagementHandlers } from "./handlers/students/index.js";

// renders & handles reRegistration management
import { initializeRenderReRegistrationManagement } from "./renders/reregistration/index.js";
import { initializeReRegistrationManagementHandlers } from "./handlers/reregistration/index.js";

// renders & handles delete request management
import { initializeRenderDeleteRequestManagement } from "./renders/delete-request/index.js";
import { initializeDeleteRequestManagementHandlers } from "./handlers/delete-request/index.js";

// renders & handles master data management
import { initializeRenderMasterDataManagement } from "./renders/master-data/index.js";
import { initializeMasterDataManagementHandlers } from "./handlers/master-data/index.js";

// renders & handles settings management
import { initializeRenderSettingsManagement } from "./renders/settings/index.js";
import { initializeSettingsManagementHandlers } from "./handlers/settings/index.js";

// renders & handles school settings management
import { initializeRenderSchoolSettingsManagement } from "./renders/school-settings/index.js";
import { initializeSchoolSettingsManagementHandlers } from "./handlers/school-settings/index.js";

export const renderAdminContentBySession = async () => {
    const activePageSession = getSessionStorageItem('active-page-session');

    if (!activePageSession) {
        setSessionStorageItem('active-page-session', 'students');
        await initializeRenderStudentManagement();
        initializeStudentManagementHandlers();
        return;
    };

    switch (activePageSession) {
        case "reregistration": {
            await initializeRenderReRegistrationManagement();
            initializeReRegistrationManagementHandlers();
            break;
        };
        case "request-delete-account": {
            initializeRenderDeleteRequestManagement();
            initializeDeleteRequestManagementHandlers();
            break;
        };
        case "major":
        case "batch":
        case "class": {
            initializeRenderMasterDataManagement();
            initializeMasterDataManagementHandlers();
            break;
        };
        case "settings": {
            initializeRenderSettingsManagement();
            initializeSettingsManagementHandlers();
            break;
        };
        case "school-settings": {
            initializeRenderSchoolSettingsManagement();
            initializeSchoolSettingsManagementHandlers();
            break;
        };
        default: {
            await initializeRenderStudentManagement();
            initializeStudentManagementHandlers();
        };

    };
};