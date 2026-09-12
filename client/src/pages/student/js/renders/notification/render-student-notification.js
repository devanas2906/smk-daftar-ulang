import { createStudentNotificationItem } from "../../components/notification/student-notification-content.js";

import * as api from "../../student-api.js";

import { updateManagementContentState } from "../../utilities/render-utils.js";

export const renderStudentNotificationItem = async () => {
    const studentNotificationManagementContainer = document.querySelector('.student-dashboard-notification-container');
    if (!studentNotificationManagementContainer) return;

    const { notifications } = await api.getNotifications();

    studentNotificationManagementContainer.innerHTML = "";

    for (const notification of notifications) {
        const studentNotificationItem = createStudentNotificationItem(notification);
        studentNotificationManagementContainer.appendChild(studentNotificationItem);
    };

    updateManagementContentState(notifications.length, "Tidak ada notifikasi.");
};