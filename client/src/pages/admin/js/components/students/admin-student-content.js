import { createElement } from "../../../../../common/js/component-utils.js";

import { badgeAccountData, studentTableRowPrivateData, setStudentFilterPayload } from "../../utilities/students/student-management-utils.js";
import { resetAndUpdateStudentByFilter } from "../../utilities/students/student-filter-utils.js";
import { getMasterData } from "../../utilities/master-data/master-data-management-utils.js";

export const createAdminStudentManagementContent = () => {
    const adminStudentManagementContent = createElement(
        `<div class="admin-dashboard-management-content admin-dashboard-student-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title">Data Siswa</h2>
              
              <div class="admin-dashboard-management-header-filter-bar">
                 <button class="admin-dashboard-student-management-refresh-button button-component button-component-outline button-component-icon"><i class="fa-solid fa-rotate"></i></button>
                 <button class="admin-dashboard-student-management-add-button button-component button-component-primary"><i class="fa-solid fa-plus"></i> Tambah Siswa</button>
              </div>
           </div>

           <div class="admin-dashboard-student-management-filter-bar">
              <input type="text" placeholder="Cari Nama..." class="student-management-name-input-filter"/>
              <input type="text" placeholder="Cari NISN..." class="student-management-nisn-input-filter"/>

              <select class="student-management-major-select-filter"><option value="">Semua Jurusan</option></select>
              <select class="student-management-entry-year-select-filter"><option value="">Semua Angkatan</option></select>
              <select class="student-management-class-select-filter"><option value="">Semua Kelas</option></select>
              
              <button class="student-management-apply-filter-button button-component button-component-outline button-component-sm">Terapkan</button>
           </div>

           <section class="admin-dashboard-management-table-container admin-dashboard-student-management-table-container"></section>
        </div>`
    );

    const { majors, batchs, studentClasses } = getMasterData();

    const adminStudentManagementRefreshButton = adminStudentManagementContent.querySelector('.admin-dashboard-student-management-refresh-button');
    const adminStudentManagementApplyFilterButton = adminStudentManagementContent.querySelector('.student-management-apply-filter-button');

    const adminStudentManagementMajorSelect = adminStudentManagementContent.querySelector('.student-management-major-select-filter');
    const adminStudentManagementEntryYearSelect = adminStudentManagementContent.querySelector('.student-management-entry-year-select-filter');
    const adminStudentManagementClassSelect = adminStudentManagementContent.querySelector('.student-management-class-select-filter');

    for (const major of majors) {
        const { _id, majorName } = major;
        const adminStudentManagementOption = createAdminStudentManagementOption(_id, majorName);
        adminStudentManagementMajorSelect.appendChild(adminStudentManagementOption);
    };

    for (const batch of batchs) {
        const { _id, entryYear } = batch;
        const adminStudentManagementOption = createAdminStudentManagementOption(_id, entryYear);
        adminStudentManagementEntryYearSelect.appendChild(adminStudentManagementOption);
    };

    for (const studentClass of studentClasses) {
        const { _id, className } = studentClass;
        const adminStudentManagementOption = createAdminStudentManagementOption(_id, className);
        adminStudentManagementClassSelect.appendChild(adminStudentManagementOption);
    };

    adminStudentManagementRefreshButton.addEventListener('click', async (event) => {
        event.stopImmediatePropagation();
        resetAndUpdateStudentByFilter();
    });

    adminStudentManagementApplyFilterButton.addEventListener('click', async (event) => {
        event.stopImmediatePropagation();

        setStudentFilterPayload();
        resetAndUpdateStudentByFilter();
    });

    return adminStudentManagementContent;
};

const createAdminStudentManagementOption = (_id, label) => createElement(`<option value="${_id}">${label}</option>`);

export const createAdminStudentManagementTable = () => {
    return createElement(
        `<table class="dashboard-management-table admin-dashboard-management-table admin-dashboard-student-management-table">
               <thead class="admin-dashboard-management-table-head admin-dashboard-student-management-table-head">
                  <tr class="admin-dashboard-management-table-row admin-dashboard-management-table-row">
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">NISN</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Nama</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Kelas</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Jurusan</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Angkatan</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Status</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Aksi</th>
                    </tr>
                </thead>

                <tbody class="dashboard-management-table-body admin-dashboard-management-table-body admin-dashboard-student-management-table-body"></tbody>
            </table>
        `
    );
};

export const createAdminStudentManagementTableRow = ({ user: { _id, accountStatus }, class: studentClass, major, batch, nisn, name }) => {
    const className = studentClass ? studentClass.className : "-";
    const majorName = major ? major.majorName : "-";
    const entryYear = batch ? batch.entryYear : "-";

    const adminStudentTableRow = document.createElement('tr');

    const adminStudentTableNisnData = document.createElement('td');
    const adminStudentTableNameData = document.createElement('td');
    const adminStudentTableClassData = document.createElement('td');
    const adminStudentTableMajorData = document.createElement('td');
    const adminStudentTableEntryYearData = document.createElement('td');
    const adminStudentTableStatusData = document.createElement('td');
    const adminStudentTableActionData = document.createElement('td');

    const adminStudentStatus = document.createElement('span');

    const adminStudentActionContainer = document.createElement('div');
    const adminStudentActionEditButton = document.createElement('button');

    const adminDashboardManagementTableData = [adminStudentTableNisnData, adminStudentTableNameData, adminStudentTableClassData, adminStudentTableMajorData, adminStudentTableEntryYearData, adminStudentTableStatusData, adminStudentTableActionData];
    const adminDashboardManagementActionButtons = [adminStudentActionEditButton];

    adminStudentTableRow.classList.add('dashboard-management-table-row', 'admin-dashboard-management-table-row', 'admin-dashboard-student-management-table-row');

    adminDashboardManagementTableData.forEach(tableData => tableData.classList.add('dashboard-management-table-data', 'admin-dashboard-management-table-data'));
    adminDashboardManagementActionButtons.forEach(actionButton => actionButton.classList.add('admin-dashboard-management-action-button', 'button-component', 'button-component-outline', 'button-component-sm'));

    adminStudentActionEditButton.classList.add('admin-dashboard-management-action-edit-button');

    adminStudentStatus.classList.add('badge-component', `${badgeAccountData[accountStatus].class}`);
    adminStudentActionContainer.classList.add('admin-dashboard-management-actions-container');

    adminStudentTableNisnData.dataset.label = "NISN";
    adminStudentTableNameData.dataset.label = "Nama";
    adminStudentTableClassData.dataset.label = "Kelas";
    adminStudentTableMajorData.dataset.label = "Jurusan";
    adminStudentTableEntryYearData.dataset.label = "Angkatan";
    adminStudentTableActionData.dataset.label = "Aksi";

    adminStudentTableNisnData.textContent = nisn;
    adminStudentTableNameData.textContent = name;
    adminStudentTableClassData.textContent = className;
    adminStudentTableMajorData.textContent = majorName;
    adminStudentTableEntryYearData.textContent = entryYear;
    adminStudentStatus.textContent = badgeAccountData[accountStatus].label;

    adminStudentActionEditButton.innerHTML = '<i class="fa-solid fa-pen"></i>';

    adminStudentTableStatusData.appendChild(adminStudentStatus);
    adminStudentTableActionData.appendChild(adminStudentActionContainer);

    adminDashboardManagementActionButtons.forEach(actionButton => adminStudentActionContainer.appendChild(actionButton));
    adminDashboardManagementTableData.forEach(tableData => adminStudentTableRow.appendChild(tableData));

    studentTableRowPrivateData.set(adminStudentTableRow, { userDocumentId: _id });
    return adminStudentTableRow;
};