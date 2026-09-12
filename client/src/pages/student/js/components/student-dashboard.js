import { createElement } from "../../../../common/js/component-utils.js";

import { getInitial } from '../../../../common/js/formatters.js';
import { logout } from '../../../../common/js/auth.js';

import { sidebarItemData } from "../utilities/sidebar-utils.js";
import { getStudentProfileSummaryData } from "../utilities/profile-summary-data.js";

export const createStudentDashboard = (student) => {
   const { name } = student;

   const studentDashboard = createElement(
      `<div class="student-dashboard">
            <aside class="dashboard-sidebar student-dashboard-sidebar">
               <h2 class="student-dashboard-sidebar-title">Dashboard Siswa</h2>
               <nav class="student-dashboard-sidebar-item-container">
                  <ul class="student-dashboard-sidebar-item-list"></ul>
               </nav>
               <button class="student-dashboard-logout-button" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button>
            </aside>

           <main class="student-dashboard-content-container">
              <div class="student-dashboard-content-header">
                 <div class="dashboard-sidebar-toggle student-dashboard-sidebar-toggle dashboard-sidebar-toggle-component"><i class="fa-solid fa-bars"></i></div>
                    <h2 class="student-dashboard-content-title">Beranda</h1>
                    <div class="student-dashboard-content-avatar">
                       <span class="student-dashboard-content-avatar-name"></span>
                       <div class="student-dashboard-content-avatar-circle"></div>
                    </div>
              </div>

              <div class="student-dashboard-profile-summary"></div>
              <div class="student-dashboard-content"></div>
           </main>
        </div>`
   );

   const studentDashboardSidebarItemList = studentDashboard.querySelector('.student-dashboard-sidebar-item-list');
   const studentDashboardLogoutButton = studentDashboard.querySelector('.student-dashboard-logout-button');

   const studentDashboardContentAvatarName = studentDashboard.querySelector('.student-dashboard-content-avatar-name');
   const studentDashboardContentAvatarCircle = studentDashboard.querySelector('.student-dashboard-content-avatar-circle');
   const studentDashboardProfileSummary = studentDashboard.querySelector('.student-dashboard-profile-summary');

   const studentProfileSummaryData = getStudentProfileSummaryData(student);

   for (const itemData of sidebarItemData) {
      const studentDashboardSidebarItem = createStudentDashboardSidebarItem(itemData);
      studentDashboardSidebarItemList.appendChild(studentDashboardSidebarItem);
   };

   for (const profileSummaryData of studentProfileSummaryData) {
      const studentDashboardProfileSummaryItem = createStudentDashboardProfileSummaryItem(profileSummaryData);
      studentDashboardProfileSummary.appendChild(studentDashboardProfileSummaryItem);
   };

   studentDashboardLogoutButton.addEventListener('click', logout);

   studentDashboardContentAvatarName.textContent = name;
   studentDashboardContentAvatarCircle.textContent = getInitial(name);

   return studentDashboard;
};

const createStudentDashboardSidebarItem = ({ key, label, icon }) => createElement(`<li class="student-dashboard-sidebar-item" data-key="${key}"><i class="fa-solid ${icon}"></i> ${label}</li>`);
const createStudentDashboardProfileSummaryItem = ({ label, data }) => createElement(`<div class="student-dashboard-profile-summary-item"><span class="student-dashboard-profile-summary-label">${label}</span><span class="student-dashboard-profile-summary-value">${data}</span></div>`);