import { handleStudentDeleteNotification } from "./student-delete-notification.js";
import { handleStudentDeleteAccount } from "./student-delete-account.js";

export const initializeNotificationManagementHandlers = () => {
    handleStudentDeleteNotification();
    handleStudentDeleteAccount();
};