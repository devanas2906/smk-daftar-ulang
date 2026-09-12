import { setSessionStorageItem, getSessionStorageItem } from "../../../../common/js/auth.js";

export const sidebarItemData = [
    { key: 'dashboard', label: 'Beranda', icon: 'fa-house' },
    { key: 'notification', label: 'Notifikasi', icon: 'fa-bell' },
    { key: 'settings', label: 'Pengaturan Akun', icon: 'fa-gear' }
];

export const updateActiveSidebarNavigationState = ({ triggerBy, newActivePageSession }) => {
    const studentDashboardSidebarItems = document.querySelectorAll('.student-dashboard-sidebar-item');
    const studentDashboardContentTitle = document.querySelector('.student-dashboard-content-title');

    let activeSidebarItem = null;

    switch (triggerBy) {
        case "reload": {
            const activePageSession = getSessionStorageItem('active-page-session');

            if (!activePageSession) {
                activeSidebarItem = [...studentDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === 'dashboard');
            } else {
                activeSidebarItem = [...studentDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === activePageSession);
            };

            break;
        };
        case "click": {
            activeSidebarItem = [...studentDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === newActivePageSession);
            studentDashboardSidebarItems.forEach(studentDashboardSidebarItem => studentDashboardSidebarItem.classList.remove('sidebar-active'));
            break;
        };
    };

    const activeSidebarItemKey = activeSidebarItem.dataset.key;
    const activeSidebarItemLabel = sidebarItemData.find(itemData => itemData.key === activeSidebarItemKey).label;

    activeSidebarItem.classList.add('sidebar-active');
    studentDashboardContentTitle.textContent = activeSidebarItemLabel;

    setSessionStorageItem('active-page-session', activeSidebarItemKey);
};