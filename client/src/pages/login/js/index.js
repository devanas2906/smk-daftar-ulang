import { apiFetch } from "../../../common/js/api-utils.js";
import { getLocalStorageItem, redirectByRole } from "../../../common/js/auth.js"

import { initializeRenderLogin } from "./renders/index.js";
import { initializeLoginHandlers } from "./handlers/index.js";

import { applySweetalert2Message } from "../../../common/js/utilities/sweetalert2.js";

export const initializeLoginFrontend = async () => {
    const token = getLocalStorageItem('token');

    try {
        if (token) {
            const { role } = await apiFetch('/auth/check-status');
            redirectByRole(role);
            return;
        };

        initializeRenderLogin();
        initializeLoginHandlers();
    } catch (error) {
        applySweetalert2Message("error", "Gagal", error.message);
    };
};