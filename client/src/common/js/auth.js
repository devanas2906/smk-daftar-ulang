import { apiFetch } from "./api-utils.js";
import { renderForbidden } from "./component-utils.js";

export const validateAuthAndRole = async (requiredRole) => {
    const token = getLocalStorageItem("token");

    if (!token) {
        redirectByPath('/login');
        return { isAuthorized: false };
    };

    const { success, role: currentRole } = await apiFetch('/auth/check-status');
    if (!success) {
        removeLocalStorageItem("token");
        redirectByPath('/login');
        return { isAuthorized: false };
    };

    if (currentRole !== requiredRole) {
        removeLocalStorageItem("token");
        renderForbidden();
        return { isAuthorized: false };
    };

    return { isAuthorized: true };
};

export const redirectByPath = (path) => {
    window.location.href = path;
};

export const redirectByRole = (role) => {
    redirectByPath(role === 'admin' ? '/admin' : '/student');
};

export const logout = () => {
    removeLocalStorageItem("token");
    removeSessionStorageItem("active-page-session");
    redirectByPath('/login');
};

export const setLocalStorageItem = (key, value) => localStorage.setItem(key, value);
export const getLocalStorageItem = (key) => localStorage.getItem(key);
export const removeLocalStorageItem = (key) => localStorage.removeItem(key);

export const setSessionStorageItem = (key, value) => sessionStorage.setItem(key, value);
export const getSessionStorageItem = (key) => sessionStorage.getItem(key);
export const removeSessionStorageItem = (key) => sessionStorage.removeItem(key);