import { apiFetch } from '../../../common/js/api-utils';

// Account update
export const updateStudentPassword = (payload) => apiFetch(`/student/settings/me`, { method: 'PUT', body: JSON.stringify(payload) });
export const changeEmailOtpStatus = (payload) => apiFetch(`/student/settings/change-email/otp/status`, { method: 'POST', body: JSON.stringify(payload) });
export const changeEmailOtpVerification = (payload) => apiFetch(`/student/settings/change-email/otp/verify`, { method: 'POST', body: JSON.stringify(payload) });
export const changeEmailResendOtp = (payload) => apiFetch(`/student/settings/change-email/otp/resend`, { method: 'POST', body: JSON.stringify(payload) });

export const getProfile = () => apiFetch('/student/account/profile');

export const getReRegistrations = () => apiFetch('/student/re-registrations');
export const submitReRegistration = (formData) => apiFetch('/student/re-registrations', { method: 'POST', body: formData });
export const updateReRegistration = (formData, id) => apiFetch(`/student/re-registrations/${id}`, { method: 'PUT', body: formData });

export const getNotifications = () => apiFetch('/student/notifications');
export const deleteNotification = (id) => apiFetch(`/student/notifications/${id}`, { method: 'DELETE' });

export const requestDeleteAccount = () => apiFetch('/student/account/request-delete', { method: 'POST' });
export const executeDeleteAccount = () => apiFetch('/student/account/execute-delete', { method: 'DELETE' });
