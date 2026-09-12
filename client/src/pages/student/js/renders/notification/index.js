import { renderStudentNotificationManagementContent } from "./render-student-notification-management.js";
import { renderStudentNotificationItem } from "./render-student-notification.js";

export const initializeRenderNotificationManagement = () => {
    renderStudentNotificationManagementContent();
    renderStudentNotificationItem();
};