import { setSessionStorageItem, getSessionStorageItem } from "../../../../common/js/auth.js";

export const sidebarItemData = [
    { key: 'students', label: 'Data Siswa', icon: 'fa-users' },
    { key: 'reregistration', label: 'Verifikasi Daftar Ulang', icon: 'fa-file-circle-check' },
    { key: 'request-delete-account', label: 'Permintaan Hapus Akun', icon: 'fa-user-slash' },
    { key: 'major', label: 'Jurusan', icon: 'fa-sitemap' },
    { key: 'batch', label: 'Angkatan', icon: 'fa-calendar' },
    { key: 'class', label: 'Kelas', icon: 'fa-chalkboard' },
    { key: 'settings', label: 'Pengaturan Akun', icon: 'fa-gear' },
    { key: 'school-settings', label: 'Pengaturan Sekolah', icon: 'fa-gear' },
];

export const updateActiveSidebarNavigationState = ({ triggerBy, newActivePageSession }) => {
    const adminDashboardSidebarItems = document.querySelectorAll('.admin-dashboard-sidebar-item');
    const adminDashboardContentTitle = document.querySelector('.admin-dashboard-content-title');

    let activeSidebarItem = null;

    switch (triggerBy) {
        case "reload": {
            const activePageSession = getSessionStorageItem('active-page-session');

            if (!activePageSession) {
                activeSidebarItem = [...adminDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === 'students');
            } else {
                activeSidebarItem = [...adminDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === activePageSession);
            };

            break;
        };
        case "click": {
            activeSidebarItem = [...adminDashboardSidebarItems].find(sidebarItem => sidebarItem.dataset.key === newActivePageSession);
            adminDashboardSidebarItems.forEach(adminDashboardSidebarItem => adminDashboardSidebarItem.classList.remove('sidebar-active'));
            break;
        };
    };

    const activeSidebarItemKey = activeSidebarItem.dataset.key;
    const activeSidebarItemLabel = sidebarItemData.find(itemData => itemData.key === activeSidebarItemKey).label;

    activeSidebarItem.classList.add('sidebar-active');
    adminDashboardContentTitle.textContent = activeSidebarItemLabel;

    setSessionStorageItem('active-page-session', activeSidebarItemKey);
};