export const badgeAccountData = {
    pending_verification: { class: 'badge-component-pending-verification', label: 'Menunggu Verifikasi Akun' },
    active: { class: 'badge-component-active', label: 'Aktif' },
    non_active: { class: 'badge-component-non-active', label: 'Nonaktif' },
    rejected: { class: 'badge-component-rejected', label: 'Ditolak' },
};

export const studentTableRowPrivateData = new WeakMap();

const studentFilterPayload = { name: "", nisn: "", major: "", batch: "", class: "" };

export const setStudentFilterPayload = () => {
    const nameInputFilterValue = document.querySelector('.student-management-name-input-filter').value.trim();
    const nisnInputFilterValue = document.querySelector('.student-management-nisn-input-filter').value.trim();

    const majorSelectFilterValue = document.querySelector('.student-management-major-select-filter').selectedOptions[0].value.trim();
    const entryYearSelectFilterValue = document.querySelector('.student-management-entry-year-select-filter').selectedOptions[0].value.trim();
    const classSelectFilterValue = document.querySelector('.student-management-class-select-filter').selectedOptions[0].value.trim();

    studentFilterPayload.name = nameInputFilterValue;
    studentFilterPayload.nisn = nisnInputFilterValue;
    studentFilterPayload.major = majorSelectFilterValue;
    studentFilterPayload.batch = entryYearSelectFilterValue;
    studentFilterPayload.class = classSelectFilterValue;
};

export const getStudentFilterPayload = () => studentFilterPayload;