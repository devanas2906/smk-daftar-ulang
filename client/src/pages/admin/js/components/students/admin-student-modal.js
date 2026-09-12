import { createElement } from "../../../../../common/js/component-utils.js";
import { formatTanggal } from "../../../../../common/js/formatters.js";
import { getMasterData } from "../../utilities/master-data/master-data-management-utils.js";

export const createAdminStudentModal = ({ student = {}, rejectedReRegistration = {} } = {}) => {
    const { user: { email, accountStatus, scheduledDeletionAt } = {}, batch: { _id: activeBatchId } = {}, major: { _id: activeMajorId } = {}, class: { _id: activeClassId } = {}, nisn, name, parentName, address } = student;
    const modalTitle = Object.keys(student).length ? "Edit Siswa" : "Tambah Siswa";

    const adminStudentModal = createElement(
        `<div class="admin-dashboard-modal-overlay admin-dashboard-student-modal-overlay dashboard-modal-overlay modal-overlay-component">
           <div class="admin-dashboard-modal admin-dashboard-student-modal modal-box-component">
              <h2 class="admin-dashboard-modal-title admin-dashboard-student-modal-title"></h2>

              <form class="admin-dashboard-modal-form admin-dashboard-student-modal-form">
                <div class="admin-dashboard-modal-actions modal-actions-component">
                    <button type="button" class="cancel-student-modal-button button-component button-component-outline">Batal</button>
                    <button type="submit" class="save-student-modal-button button-component button-component-primary">Simpan</button>
                </div>
              </form>
            </div> 
        </div>`
    );

    const { majors, batchs, studentClasses } = getMasterData();
    const isRejectedAccountStatus = accountStatus && accountStatus === "rejected";

    const adminDashboardStudentModalTitle = adminStudentModal.querySelector('.admin-dashboard-student-modal-title');
    const adminDashboardStudentModalForm = adminStudentModal.querySelector('.admin-dashboard-student-modal-form');
    const adminDashboardStudentModalActions = adminStudentModal.querySelector('.admin-dashboard-modal-actions');
    const adminDashboardStudentModalCancelButton = adminStudentModal.querySelector('.cancel-student-modal-button');
    const adminDashboardStudentModalSaveButton = adminStudentModal.querySelector('.save-student-modal-button');

    adminDashboardStudentModalTitle.textContent = modalTitle;

    if (isRejectedAccountStatus) {
        const { note: rejectedNote } = rejectedReRegistration;

        const adminStudentModalRejectedNoteLabel = createAdminStudentModalLabel('rejected-note', 'Catatan Alasan Penolakan');
        const adminStudentModalRejectedNoteTextarea = createAdminStudentModalTextarea('rejected-note', rejectedNote, 'Catatan alasan penolakan', 'readonly');
        const adminStudentModalScheduledDeletion = createAdminStudentModalScheduledDeletion(scheduledDeletionAt);
        [adminStudentModalRejectedNoteLabel, adminStudentModalRejectedNoteTextarea, adminStudentModalScheduledDeletion].forEach(element => adminDashboardStudentModalForm.insertBefore(element, adminDashboardStudentModalActions));

        adminDashboardStudentModalSaveButton.textContent = "Batalkan Penolakan";
    } else {
        const adminStudentModalEmailLabel = createAdminStudentModalLabel('email', 'Email');
        const adminStudentModalNisnLabel = createAdminStudentModalLabel('nisn', 'NISN');
        const adminStudentModalNameLabel = createAdminStudentModalLabel('name', 'Nama Lengkap');
        const adminStudentModalMajorLabel = createAdminStudentModalLabel('major', 'Jurusan');
        const adminStudentModalEntryYearLabel = createAdminStudentModalLabel('entry-year', 'Angkatan');
        const adminStudentModalParentNameLabel = createAdminStudentModalLabel('parent-name', 'Nama Orang Tua / Wali');
        const adminStudentModalStudentAddressLabel = createAdminStudentModalLabel('student-address', 'Alamat Rumah');

        const adminStudentModalEmailInput = createAdminStudentModalInput('email', 'text', email, 'Email Siswa', 'required');
        const adminStudentModalNisnInput = createAdminStudentModalInput('nisn', 'text', nisn, 'NISN Siswa', 'required');
        const adminStudentModalNameInput = createAdminStudentModalInput('name', 'text', name, 'Nama Lengkap Siswa', 'required');
        const adminStudentModalMajorSelect = createAdminStudentModalSelect('major', 'Pilih Jurusan');
        const adminStudentModalEntryYearSelect = createAdminStudentModalSelect('entry-year', 'Pilih Angkatan');
        const adminStudentModalParentNameInput = createAdminStudentModalInput('parent-name', 'text', parentName, 'Nama ayah, ibu, atau wali siswa', 'required');
        const adminStudentModalStudentAddressInput = createAdminStudentModalInput('student-address', 'text', address, 'Alamat rumah siswa', 'required');

        for (const major of majors) {
            const { _id, majorName } = major;
            const adminStudentModalOption = createAdminStudentModalOption(_id, activeMajorId, majorName);
            adminStudentModalMajorSelect.appendChild(adminStudentModalOption);
        };

        for (const batch of batchs) {
            const { _id, entryYear } = batch;
            const adminStudentModalOption = createAdminStudentModalOption(_id, activeBatchId, entryYear);
            adminStudentModalEntryYearSelect.appendChild(adminStudentModalOption);
        };

        [
            adminStudentModalEmailLabel,
            adminStudentModalEmailInput,
            adminStudentModalNisnLabel,
            adminStudentModalNisnInput,
            adminStudentModalNameLabel,
            adminStudentModalNameInput,
            adminStudentModalMajorLabel,
            adminStudentModalMajorSelect,
            adminStudentModalEntryYearLabel,
            adminStudentModalEntryYearSelect,
            adminStudentModalParentNameLabel,
            adminStudentModalParentNameInput,
            adminStudentModalStudentAddressLabel,
            adminStudentModalStudentAddressInput
        ].forEach(element => adminDashboardStudentModalForm.insertBefore(element, adminDashboardStudentModalActions));

        // append class select
        if (!accountStatus || (accountStatus && accountStatus !== "pending_verification")) {
            const adminStudentModalClassLabel = createAdminStudentModalLabel('class', 'Kelas');
            const adminStudentModalClassSelect = createAdminStudentModalSelect('class', 'Pilih Kelas');

            for (const studentClass of studentClasses) {
                const { _id, className } = studentClass;
                const adminStudentModalOption = createAdminStudentModalOption(_id, activeClassId, className);
                adminStudentModalClassSelect.appendChild(adminStudentModalOption);
            };

            adminDashboardStudentModalForm.insertBefore(adminStudentModalClassSelect, adminStudentModalParentNameLabel);
            adminDashboardStudentModalForm.insertBefore(adminStudentModalClassLabel, adminStudentModalClassSelect);
        };

        // append account status select
        if (accountStatus && accountStatus !== "pending_verification") {
            const adminStudentModalAccountStatusLabel = createAdminStudentModalLabel('account-status', 'Status');
            const adminStudentModalAccountStatusSelect = createAdminStudentModalSelect('account-status', 'Pilih Status Akun');

            const adminStudentModalAccountStatusActiveOption = createAdminStudentModalOption('active', accountStatus, 'Aktif');
            const adminStudentModalAccountStatusNonActiveOption = createAdminStudentModalOption('non_active', accountStatus, 'Nonaktif');

            [adminStudentModalAccountStatusActiveOption, adminStudentModalAccountStatusNonActiveOption].forEach(accountStatusOption => adminStudentModalAccountStatusSelect.appendChild(accountStatusOption));

            adminDashboardStudentModalForm.insertBefore(adminStudentModalAccountStatusSelect, adminDashboardStudentModalActions);
            adminDashboardStudentModalForm.insertBefore(adminStudentModalAccountStatusLabel, adminStudentModalAccountStatusSelect);
        };

    };

    adminDashboardStudentModalCancelButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        document.body.classList.remove('overflow-hidden');
        adminStudentModal.remove();
    });

    return adminStudentModal;
};

// utilities
const createAdminStudentModalLabel = (id, label) => {
    const adminStudentModalLabel = createElement(`<label></label>`);

    adminStudentModalLabel.setAttribute("for", id);
    adminStudentModalLabel.textContent = label;

    return adminStudentModalLabel;
};

const createAdminStudentModalInput = (id, type, value, placeholder, constraint) => {
    const adminStudentModalInput = createElement(`<input class="admin-dashboard-modal-input" />`);

    adminStudentModalInput.type = type;
    adminStudentModalInput.id = id;
    adminStudentModalInput.value = value ? value : "";
    adminStudentModalInput.placeholder = placeholder;
    adminStudentModalInput[constraint] = true;

    adminStudentModalInput.classList.add(`admin-dashboard-student-modal-${id}-input`);

    return adminStudentModalInput;
};

const createAdminStudentModalTextarea = (id, value, placeholder, constraint) => {
    const adminStudentModalTextarea = createElement(`<textarea rows="5" cols="40" class="admin-dashboard-modal-textarea"></textarea>`);

    adminStudentModalTextarea.id = id;
    adminStudentModalTextarea.placeholder = placeholder;
    adminStudentModalTextarea[constraint] = true;
    adminStudentModalTextarea.textContent = value;

    adminStudentModalTextarea.classList.add(`admin-dashboard-student-modal-${id}-textarea`);

    return adminStudentModalTextarea;
};

const createAdminStudentModalSelect = (id, label) => {
    const adminStudentModalSelect = createElement(`<select class="admin-dashboard-modal-select" required></select>`);
    const adminStudentModalOption = createAdminStudentModalOption("selected", "selected", label);

    adminStudentModalSelect.id = id;
    adminStudentModalSelect.classList.add(`admin-dashboard-student-modal-${id}-select`);

    adminStudentModalOption.disabled = true;
    adminStudentModalOption.textContent = label;
    adminStudentModalSelect.appendChild(adminStudentModalOption);

    return adminStudentModalSelect;
};

const createAdminStudentModalOption = (_id, currentId, label) => {
    const adminStudentModalOption = createElement(`<option></option>`);

    adminStudentModalOption.value = _id;
    adminStudentModalOption.textContent = label;
    adminStudentModalOption.selected = _id === currentId ? true : false;

    return adminStudentModalOption;
};

const createAdminStudentModalScheduledDeletion = (scheduledDeletionAt) => {
    const normalizeScheduledDeletionAt = new Date(scheduledDeletionAt);
    const rejectedDate = normalizeScheduledDeletionAt.setDate(normalizeScheduledDeletionAt.getDate() - 3);

    const adminStudentModalScheduledDeletion = createElement(
        `<div class="admin-dashboard-modal-schedule-deletion">
           <h4 class="admin-dashboard-modal-schedule-deletion-title">Jadwal Penghapusan Permanen</h4>

           <span class="admin-dashboard-modal-rejected-date"></span>
           <span class="admin-dashboard-modal-deletion-date"></span>
        </div>`
    );

    const modalRejectedDate = adminStudentModalScheduledDeletion.querySelector('.admin-dashboard-modal-rejected-date');
    const modalDeletionDate = adminStudentModalScheduledDeletion.querySelector('.admin-dashboard-modal-deletion-date');

    modalRejectedDate.textContent = `Tanggal Penolakan: ${formatTanggal(rejectedDate)}`;
    modalDeletionDate.textContent = `Tanggal Penghapusan: ${formatTanggal(scheduledDeletionAt)}`;

    return adminStudentModalScheduledDeletion;
};