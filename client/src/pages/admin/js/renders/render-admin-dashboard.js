import { appRoot } from "../utilities/dom-refs.js";
import { createAdminDashboard } from "../components/admin-dashboard.js";

export const renderAdminDashboard = () => {
    const adminDashboard = createAdminDashboard();
    appRoot.appendChild(adminDashboard);
};