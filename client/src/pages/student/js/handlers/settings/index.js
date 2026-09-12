import { handleStudentSettingsForm } from "./student-settings-form.js";
import { initializeChangeEmailHandlers } from "./change-email/index.js";

export const initializeSettingsManagementHandlers = () => {
    handleStudentSettingsForm();
    initializeChangeEmailHandlers();
};