import { notificationItemPrivateData } from "../../utilities/notification/notification-management-utils.js";
import { renderStudentNotificationItem } from "../../renders/notification/render-student-notification.js";

import * as api from "../../student-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentDeleteNotification = () => {
    document.body.addEventListener('click', async function (event) {
        const deleteNotificationButton = event.target.closest('.student-dashboard-notification-delete-button');

        if (deleteNotificationButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('warning', 'Hapus Notifikasi?', 'Yakin hapus notifikasi ini?', 'Ya, Hapus', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const notificationItem = deleteNotificationButton.closest('.student-dashboard-notification-item');
                const { notificationDocumentId } = notificationItemPrivateData.get(notificationItem);

                const { message } = await api.deleteNotification(notificationDocumentId);
                renderStudentNotificationItem();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };

        };

    });
};