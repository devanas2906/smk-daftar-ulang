import { apiFetch, getRejectedReRegistration } from "../../../../common/js/api-utils.js";
import { redirectByPath, removeLocalStorageItem } from "../../../../common/js/auth.js";

import * as api from "../student-api.js";
import { renderStudentRegistrationResultCard } from "../renders/render-student-reregistration-result-card.js";

export const validateRequireChangePassword = async () => {
    const { isDefaultPassword } = await apiFetch('/auth/check-default-password');

    if (isDefaultPassword) {
        removeLocalStorageItem("token");
        redirectByPath('/login');
    };

    return { isRequireChangePassword: isDefaultPassword };
};

export const validateRejectedReRegistrationResult = async () => {
    const { student: { user: { _id }, name } } = await api.getProfile();
    const { rejectedReRegistration } = await getRejectedReRegistration(_id);

    if (rejectedReRegistration) {
        const { note } = rejectedReRegistration;

        renderStudentRegistrationResultCard({ name, note });
        return { isRejectedReRegistration: true };
    };

    return { isRejectedReRegistration: false };
};