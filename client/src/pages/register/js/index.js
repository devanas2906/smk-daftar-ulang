import { apiFetch } from "../../../common/js/api-utils.js";
import { getLocalStorageItem, redirectByRole } from "../../../common/js/auth.js";

import { updateRegisterStatus } from "./utilities/update-register-status.js";

import { initializeRenderRegister } from "./renders/index.js";
import { initializeRegisterHandlers } from "./handlers/index.js";

import { applySweetalert2Message } from "../../../common/js/utilities/sweetalert2.js";

export const initializeRegisterFrontend = async () => {
    const token = getLocalStorageItem('token');

    try {
        if (token) {
            const { role } = await apiFetch('/auth/check-status');
            redirectByRole(role);
            return;
        };

        await updateRegisterStatus();
        await initializeRenderRegister();
        initializeRegisterHandlers();
    } catch (error) {
        applySweetalert2Message("error", "Gagal", error.message);
    };
};