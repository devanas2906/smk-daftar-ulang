import { renderForbidden } from "./component-utils.js";
import { redirectByPath, getLocalStorageItem, removeLocalStorageItem } from "./auth.js";

const apiBase = '/api';

export const apiFetch = async (endpoint, options = {}) => {
    const token = getLocalStorageItem('token');
    const headers = { ...(options.headers || {}) };

    if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${apiBase}${endpoint}`, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
        switch (response.status) {
            case 401:
                removeLocalStorageItem("token");
                redirectByPath("/login");
                break;
            case 403:
                removeLocalStorageItem("token");
                renderForbidden();
                break;
            default:
                throw new Error(data.message || 'Terjadi kesalahan.');
        };
    };

    return data;
};

// Get school profiles
export const getSchoolProfile = () => apiFetch('/public/schools/profile');

// Get register master option
export const getMasterRegisterOptions = () => apiFetch('/public/master/register-options');

// Get rejeccted reregistration
export const getRejectedReRegistration = (id) => apiFetch(`/shared/re-registrations/rejected/${id}`);