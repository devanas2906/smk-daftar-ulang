export const handleDashboardSidebarToggle = () => {
    document.body.addEventListener('click', function (event) {
        const sidebarToggle = event.target.closest('.dashboard-sidebar-toggle');
        const dashboardSidebar = this.querySelector('.dashboard-sidebar');
        const dashboardModalOverlay = this.querySelector('.dashboard-modal-overlay');

        if (!sidebarToggle?.contains(event.target) && !dashboardSidebar?.contains(event.target) && !dashboardModalOverlay?.contains(event.target)) {
            dashboardSidebar.classList.remove('show-dashboard-sidebar');
            this.classList.remove('backdrop', 'overflow-hidden');
        };

        if (sidebarToggle) {
            dashboardSidebar?.classList.toggle('show-dashboard-sidebar');
            this.classList.toggle('backdrop');
            this.classList.toggle('overflow-hidden');
        };

    });
};