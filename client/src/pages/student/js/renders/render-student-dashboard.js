import { appRoot } from "../utilities/dom-refs.js";
import { createStudentDashboard } from "../components/student-dashboard.js";

import * as api from "../student-api.js";

export const renderStudentDashboard = async () => {
    const { student } = await api.getProfile();

    const studentDashboard = createStudentDashboard(student);
    appRoot.appendChild(studentDashboard);
};