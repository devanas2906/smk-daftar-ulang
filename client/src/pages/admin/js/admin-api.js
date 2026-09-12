import { apiFetch } from '../../../common/js/api-utils.js';

// Account update
export const updateAccountData = (payload) => apiFetch(`/admin/settings/me`, { method: 'PUT', body: JSON.stringify(payload) });
export const updateSchoolData = (payload) => apiFetch(`/admin/schools`, { method: 'PUT', body: JSON.stringify(payload) });

// Get Profile
export const getProfile = () => apiFetch('/admin/account/profile');

// Master data
export const getMasterData = (type) => apiFetch(`/admin/master/${type}`);
export const createMasterData = (type, payload) =>
  apiFetch(`/admin/master/${type}`, { method: 'POST', body: JSON.stringify(payload) });
export const updateMasterData = (type, id, payload) =>
  apiFetch(`/admin/master/${type}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteMasterData = (type, id) => apiFetch(`/admin/master/${type}/${id}`, { method: 'DELETE' });

// Students
export const getStudents = (query = {}) => {
  const params = new URLSearchParams(Object.entries(query).filter(([, v]) => v));
  return apiFetch(`/admin/students?${params.toString()}`);
};
export const restoreRejectedStudent = (id) => apiFetch(`/admin/students/restore/${id}`, { method: 'POST' });
export const createStudent = (payload) => apiFetch('/admin/students', { method: 'POST', body: JSON.stringify(payload) });
export const updateStudent = (id, payload) => apiFetch(`/admin/students/${id}`, { method: 'PUT', body: JSON.stringify(payload) });

// Delete requests
export const getDeleteRequests = () => apiFetch('/admin/delete-requests');
export const rejectDeleteRequest = (id, rejectedReason) => apiFetch(`/admin/delete-requests/${id}/reject`, { method: 'POST', body: JSON.stringify({ rejectedReason }) });
export const approveDeleteRequest = (id) => apiFetch(`/admin/delete-requests/${id}/approve`, { method: 'POST' });

// Re-registration review
export const getReRegistrations = (status = '') => apiFetch(`/admin/re-registrations${status ? `?status=${status}` : ''}`);
export const approveReRegistration = (id, classValue) => apiFetch(`/admin/re-registrations/${id}/approve${classValue ? `?classValue=${classValue}` : ''}`, { method: 'POST' });
export const revisionReRegistration = (id, revisionReason) => apiFetch(`/admin/re-registrations/${id}/revision`, { method: 'POST', body: JSON.stringify({ note: revisionReason }) });
export const rejectReRegistration = (id, rejectedReason) => apiFetch(`/admin/re-registrations/${id}/reject`, { method: 'POST', body: JSON.stringify({ note: rejectedReason }) });
export const deleteReRegistration = (id) => apiFetch(`/admin/re-registrations/${id}`, { method: 'DELETE' });