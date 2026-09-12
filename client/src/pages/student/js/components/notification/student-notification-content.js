import { createElement } from "../../../../../common/js/component-utils.js";
import { formatTanggal } from "../../../../../common/js/formatters.js";

import { notificationItemPrivateData } from "../../utilities/notification/notification-management-utils.js";

import { renderStudentNotificationItem } from "../../renders/notification/render-student-notification.js";

export const createStudentNotificationManagementContent = () => {
   const studentNotificationManagementContent = createElement(
      `<div class="student-dashboard-management-content student-dashboard-notification-management-content">
           <div class="student-dashboard-management-header">
              <h2 class="student-dashboard-management-title">Daftar Notifikasi</h2>
              
              <div class="student-dashboard-management-header-filter-bar student-dashboard-notification-management-header-filter-bar">
                 <button class="button-component button-component-outline button-component-icon refresh-notification-button"><i class="fa-solid fa-rotate"></i></button>
              </div>
           </div>

           <section class="student-dashboard-notification-container"></section>
        </div>`
   );

   const studentNotificationManagementRefreshButton = studentNotificationManagementContent.querySelector('.refresh-notification-button');
   studentNotificationManagementRefreshButton.addEventListener('click', renderStudentNotificationItem);

   return studentNotificationManagementContent;
};

export const createStudentNotificationItem = ({ _id, type, message, createdAt }) => {
   const studentNotificationItem = createElement(
      `<div class="student-dashboard-notification-item">
           <div class="student-dashboard-notification-content">
              <p class="student-dashboard-notification-message"></p>
              <span class="student-dashboard-notification-date"></span>
           </div>

           <div class="student-dashboard-notification-actions">
              <button type="button" class="button-component button-component-outline button-component-icon student-dashboard-notification-delete-button"><i class="fa-solid fa-trash"></i></button>
           </div>
        </div>`
   );

   let studentNotificationButton = null;

   const studentNotificationMessage = studentNotificationItem.querySelector('.student-dashboard-notification-message');
   const studentNotificationDate = studentNotificationItem.querySelector('.student-dashboard-notification-date');
   const studentNotificationActions = studentNotificationItem.querySelector('.student-dashboard-notification-actions');

   studentNotificationMessage.textContent = message ? message : "Tidak ada pesan";
   studentNotificationDate.textContent = createdAt ? formatTanggal(createdAt) : "-";

   switch (type) {
      case "delete_account_approved": {
         studentNotificationButton = createStudentNotificationButton("danger", "delete-account", "Hapus Akun Saya Sekarang");
         break;
      };
   };

   if (studentNotificationButton) studentNotificationActions.prepend(studentNotificationButton);

   notificationItemPrivateData.set(studentNotificationItem, { notificationDocumentId: _id });

   return studentNotificationItem;
};

const createStudentNotificationButton = (classButton, typeButton, textButton) => createElement(`<button type="button" class="button-component button-component-${classButton} student-dashboard-notification-${typeButton}-button">${textButton}</button>`)