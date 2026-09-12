import { createElement } from "../../../../../common/js/component-utils.js";

import { formatRupiah } from "../../../../../common/js/currency.js";
import { formatTanggal } from "../../../../../common/js/formatters.js";

import { statusBadgeData, panelReRegistrationTableRowPrivateData } from "../../utilities/panel/panel-management-utils.js";

import { setPanelReRegistration } from "../../utilities/panel/panel-config.js";
import { updatePanelTableAndPagination } from "../../utilities/panel/update-panel-table-pagination.js";

export const createStudentPanelManagementContent = () => {
  const studentPanelManagementContent = createElement(
    `<div class="student-dashboard-management-content student-dashboard-panel-management-content">
           <div class="student-dashboard-management-header">
              <h2 class="student-dashboard-management-title">Riwayat Daftar Ulang</h2>
              
              <div class="student-dashboard-management-header-filter-bar student-dashboard-panel-management-header-filter-bar">
                 <button class="button-component button-component-outline button-component-icon refresh-panel-button"><i class="fa-solid fa-rotate"></i></button>
                 <button class="button-component button-component-primary add-panel-reregistration-button"><i class="fa-solid fa-plus"></i> Daftar Ulang</button>
              </div>
           </div>

           <section class="student-dashboard-management-table-container student-dashboard-panel-management-table-container"></section>
        </div>`
  );

  const studentPanelManagementRefreshButton = studentPanelManagementContent.querySelector('.refresh-panel-button');

  studentPanelManagementRefreshButton.addEventListener('click', async () => {
    await setPanelReRegistration();
    updatePanelTableAndPagination();
  });

  return studentPanelManagementContent;
};

export const createStudentPanelManagementDeleteAccount = () => {
  return createElement(
    `<div class="student-dashboard-panel-management-delete-account">
        <h2 class="student-dashboard-panel-management-delete-account-title">Hapus Akun</h2>
        <p class="student-dashboard-panel-management-delete-account-text">Jika Anda ingin menghapus akun secara permanen, ajukan permintaan berikut. Admin akan meninjau permintaan Anda.</p>
        <button type="button" class="button-component button-component-danger student-request-delete-account-button"><i class="fa-solid fa-user-slash"></i> Minta Hapus Akun</button>
     </div>`
  );
};

export const createStudentPanelManagementTable = () => {
  return createElement(
    `<table class="dashboard-management-table student-dashboard-management-table student-dashboard-panel-management-table">
               <thead class="student-dashboard-management-table-head student-dashboard-panel-management-table-head">
                  <tr class="student-dashboard-management-table-row student-dashboard-management-table-row">
                      <th class="dashboard-management-table-header student-dashboard-management-table-header">Tanggal</th>
                      <th class="dashboard-management-table-header student-dashboard-management-table-header">Jumlah Bayar</th>
                      <th class="dashboard-management-table-header student-dashboard-management-table-header">Status</th>
                      <th class="dashboard-management-table-header student-dashboard-management-table-header">Keterangan</th>
                      <th class="dashboard-management-table-header student-dashboard-management-table-header">Aksi</th>
                    </tr>
                </thead>

                <tbody class="dashboard-management-table-body student-dashboard-management-table-body student-dashboard-panel-management-table-body"></tbody>
            </table>`
  );
};

export const createStudentPanelManagementTableRow = ({ _id, sentDate, paymentAmount, note, status }) => {
  const reRegistrationStatusHaveNote = ["revision", "rejected"];
  const reRegistrationNote = reRegistrationStatusHaveNote.includes(status) ? note : "-";

  const studentPanelTableRow = document.createElement('tr');

  const studentPanelTableDateData = document.createElement('td');
  const studentPanelTableAmountData = document.createElement('td');
  const studentPanelTableStatusData = document.createElement('td');
  const studentPanelTableDescriptionData = document.createElement('td');
  const studentPanelTableActionData = document.createElement('td');

  const studentPanelStatus = document.createElement('span');
  const studentPanelDescription = document.createElement('span');
  const studentPanelActionsContainer = document.createElement('div');

  const studentPanelActionEditButton = document.createElement('button');
  const studentPanelActionPrintButton = document.createElement('button');

  const studentDashboardManagementTableData = [studentPanelTableDateData, studentPanelTableAmountData, studentPanelTableStatusData, studentPanelTableDescriptionData, studentPanelTableActionData];
  const studentDashboardManagementActionButtons = [studentPanelActionEditButton, studentPanelActionPrintButton];

  studentPanelTableRow.classList.add('dashboard-management-table-row', 'student-dashboard-management-table-row', 'student-dashboard-panel-management-table-row');

  studentDashboardManagementTableData.forEach(tableData => tableData.classList.add('dashboard-management-table-data', 'student-dashboard-management-table-data'));
  studentDashboardManagementActionButtons.forEach(actionButton => actionButton.classList.add('student-dashboard-management-action-button', 'button-component', 'button-component-outline', 'button-component-sm'));

  studentPanelTableDescriptionData.classList.add('student-dashboard-management-table-description-data');

  studentPanelActionEditButton.classList.add('student-dashboard-panel-management-action-edit-button');
  studentPanelActionPrintButton.classList.add('student-dashboard-panel-management-action-print-button');

  studentPanelStatus.classList.add('badge-component', `${statusBadgeData[status].class}`);
  studentPanelDescription.classList.add('student-panel-description');
  studentPanelActionsContainer.classList.add('student-dashboard-management-actions-container');

  studentPanelTableDateData.dataset.label = "Tanggal";
  studentPanelTableAmountData.dataset.label = "Jumlah";
  studentPanelTableStatusData.dataset.label = "Status";
  studentPanelTableDescriptionData.dataset.label = "Keterangan";
  studentPanelTableActionData.dataset.label = "Aksi";

  studentPanelDescription.title = reRegistrationNote;

  studentPanelTableDateData.textContent = formatTanggal(sentDate);
  studentPanelTableAmountData.textContent = formatRupiah(paymentAmount);
  studentPanelDescription.textContent = reRegistrationNote;
  studentPanelStatus.textContent = statusBadgeData[status].label;

  studentPanelActionEditButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
  studentPanelActionPrintButton.innerHTML = '<i class="fa-solid fa-print"></i>';

  studentPanelTableDescriptionData.appendChild(studentPanelDescription);
  studentPanelTableStatusData.appendChild(studentPanelStatus);

  switch (status) {
    case "draft":
    case "revision": {
      studentPanelActionsContainer.appendChild(studentPanelActionEditButton);
      break;
    };
    case "approved": {
      studentPanelActionsContainer.appendChild(studentPanelActionPrintButton);
      break;
    };
    default: {
      studentPanelActionsContainer.textContent = "-";
      break;
    };
  }

  studentPanelTableActionData.appendChild(studentPanelActionsContainer);
  studentDashboardManagementTableData.forEach(tableData => studentPanelTableRow.appendChild(tableData));

  panelReRegistrationTableRowPrivateData.set(studentPanelTableRow, { panelReRegistrationDocumentId: _id });
  return studentPanelTableRow;
};