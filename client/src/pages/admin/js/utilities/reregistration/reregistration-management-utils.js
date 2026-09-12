export const reRegistrationBadgeData = {
    pending_verification: { class: 'badge-component-pending-verification', label: "Menunggu Verifikasi Akun" },
    pending: { class: 'badge-component-pending', label: "Menunggu Verifikasi Berkas" },
    revision: { class: "badge-component-revision", label: "Menunggu Revisi" },
    approved: { class: 'badge-component-approved', label: "Disetujui" },
    rejected: { class: 'badge-component-rejected', label: "Ditolak" }
};

export const reRegistrationTableRowPrivateData = new WeakMap();

let reRegistrationStatus = "";

export const setReRegistrationFilterStatus = (status) => reRegistrationStatus = status;
export const getReRegistrationFilterStatus = () => reRegistrationStatus;