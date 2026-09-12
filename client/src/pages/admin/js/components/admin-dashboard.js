import { createElement } from "../../../../common/js/component-utils.js";
import { sidebarItemData } from "../utilities/sidebar-utils.js";

import { logout } from '../../../../common/js/auth.js';

export const createAdminDashboard = () => {
   const adminDashboard = createElement(
      `<div class="admin-dashboard">
            <aside class="dashboard-sidebar admin-dashboard-sidebar">
               <h2 class="admin-dashboard-sidebar-title">Panel Admin</h3>
               <nav class="admin-dashboard-sidebar-item-container">
                  <ul class="admin-dashboard-sidebar-item-list"></ul>
               </nav>
               <button class="admin-dashboard-logout-button" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button>
            </aside>

           <main class="admin-dashboard-content-container">
              <div class="admin-dashboard-content-header">
                 <div class="dashboard-sidebar-toggle admin-dashboard-sidebar-toggle dashboard-sidebar-toggle-component"><i class="fa-solid fa-bars"></i></div>
                 <h2 class="admin-dashboard-content-title">Data Siswa</h2>
              </div>

              <div class="admin-dashboard-content"></div>
           </main>
        </div>`
   );

   const adminDashboardSidebarItemList = adminDashboard.querySelector('.admin-dashboard-sidebar-item-list');
   const adminDashboardLogoutButton = adminDashboard.querySelector('.admin-dashboard-logout-button');

   for (const itemData of sidebarItemData) {
      const adminDashboardSidebarItem = createAdminDashboardSidebarItem(itemData);
      adminDashboardSidebarItemList.appendChild(adminDashboardSidebarItem);
   };

   adminDashboardLogoutButton.addEventListener('click', logout);

   return adminDashboard;
};

export const createAdminDashboardSidebarItem = ({ key, label, icon }) => createElement(`<li class="admin-dashboard-sidebar-item" data-key="${key}"><i class="fa-solid ${icon}"></i> ${label}</li>`);