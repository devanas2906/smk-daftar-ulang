import { createElement } from "../../../../../common/js/component-utils.js";
import { formatRupiah } from "../../../../../common/js/currency.js";
import { formatTanggal } from "../../../../../common/js/formatters.js";

import { reRegistrationBadgeData, reRegistrationTableRowPrivateData, setReRegistrationFilterStatus } from "../../utilities/reregistration/reregistration-management-utils.js";

import { resetAndUpdateReRegistrationByFilter } from "../../utilities/reregistration/reregistration-filter-utils.js";

export const createAdminReRegistrationManagementContent = () => {
  const adminReRegistrationManagementContent = createElement(
    `<div class="admin-dashboard-management-content admin-dashboard-reregistration-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title">Verifikasi Daftar Ulang</h2>
              
              <div class="admin-dashboard-management-header-filter-bar admin-dashboard-reregistration-management-header-filter-bar">
                 <select class="admin-dashboard-management-select-filter admin-dashboard-reregistration-management-select-filter">
                    <option value="">Semua Status</option>
                    <option value="pending_verification">Menunggu Verifikasi Akun</option>
                    <option value="pending">Menunggu Verifikasi Berkas</option>
                    <option value="approved">Disetujui</option>
                    <option value="rejected">Ditolak</option>
                 </select>

                 <button class="button-component button-component-outline button-component-icon refresh-reregistration-button"><i class="fa-solid fa-rotate"></i></button>
              </div>
           </div>

           <section class="admin-dashboard-management-table-container admin-dashboard-reregistration-management-table-container"></section>
        </div>`
  );

  const adminReRegistrationManagementRefreshButton = adminReRegistrationManagementContent.querySelector('.refresh-reregistration-button');
  const adminReRegistrationManagementSelectFilter = adminReRegistrationManagementContent.querySelector('.admin-dashboard-reregistration-management-select-filter');

  adminReRegistrationManagementRefreshButton.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    resetAndUpdateReRegistrationByFilter();
  });

  adminReRegistrationManagementSelectFilter.addEventListener('change', function (event) {
    event.stopImmediatePropagation();

    const reRegistrationSelectFilterValue = this.selectedOptions[0].value.trim();
    setReRegistrationFilterStatus(reRegistrationSelectFilterValue);

    resetAndUpdateReRegistrationByFilter();
  });

  return adminReRegistrationManagementContent;
};

export const createAdminReRegistrationManagementTable = () => {
  return createElement(
    `<table class="dashboard-management-table admin-dashboard-management-table admin-dashboard-reregistration-management-table">
               <thead class="admin-dashboard-management-table-head admin-dashboard-reregistration-management-table-head">
                  <tr class="admin-dashboard-management-table-row admin-dashboard-management-table-row">
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Nama</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">NISN</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Tanggal</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Jumlah</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Status</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Aksi</th>
                    </tr>
                </thead>

                <tbody class="dashboard-management-table-body admin-dashboard-management-table-body admin-dashboard-reregistration-management-table-body"></tbody>
            </table>`
  );
};

export const createAdminReRegistrationManagementTableRow = ({ _id, student: { nisn, name }, sentDate, paymentAmount, status }) => {
  const inValidDeleteReRegistrationStatus = ["pending_verification", "pending", "revision"];

  const adminReRegistrationTableRow = document.createElement('tr');

  const adminReRegistrationTableNameData = document.createElement('td');
  const adminReRegistrationTableNisnData = document.createElement('td');
  const adminReRegistrationTableDateData = document.createElement('td');
  const adminReRegistrationTableAmountData = document.createElement('td');
  const adminReRegistrationTableStatusData = document.createElement('td');
  const adminReRegistrationTableActionData = document.createElement('td');

  const adminReRegistrationStatus = document.createElement('span');
  const adminReRegistrationActionsContainer = document.createElement('div');

  const adminReRegistrationActionReviewButton = document.createElement('button');
  const adminReRegistrationActionDeleteButton = document.createElement('button');

  const adminDashboardManagementTableData = [adminReRegistrationTableNameData, adminReRegistrationTableNisnData, adminReRegistrationTableDateData, adminReRegistrationTableAmountData, adminReRegistrationTableStatusData, adminReRegistrationTableActionData];
  const adminDashboardManagementActionButtons = [adminReRegistrationActionReviewButton, adminReRegistrationActionDeleteButton];

  adminReRegistrationTableRow.classList.add('dashboard-management-table-row', 'admin-dashboard-management-table-row', 'admin-dashboard-reregistration-management-table-row');

  adminDashboardManagementTableData.forEach(tableData => tableData.classList.add('dashboard-management-table-data', 'admin-dashboard-management-table-data'));
  adminDashboardManagementActionButtons.forEach(actionButton => actionButton.classList.add('admin-dashboard-management-action-button', 'button-component', 'button-component-outline', 'button-component-sm'));

  adminReRegistrationActionReviewButton.classList.add('admin-dashboard-reregistration-management-action-review-button');
  adminReRegistrationActionDeleteButton.classList.add('admin-dashboard-reregistration-management-action-delete-button');

  adminReRegistrationStatus.classList.add('badge-component', `${reRegistrationBadgeData[status].class}`);
  adminReRegistrationActionsContainer.classList.add('admin-dashboard-management-actions-container');

  adminReRegistrationTableNameData.dataset.label = "Nama";
  adminReRegistrationTableNisnData.dataset.label = "NISN";
  adminReRegistrationTableDateData.dataset.label = "Tanggal";
  adminReRegistrationTableAmountData.dataset.label = "Jumlah";
  adminReRegistrationTableStatusData.dataset.label = "Status";
  adminReRegistrationTableActionData.dataset.label = "Aksi";

  adminReRegistrationTableNameData.textContent = name;
  adminReRegistrationTableNisnData.textContent = nisn;
  adminReRegistrationTableDateData.textContent = formatTanggal(sentDate);
  adminReRegistrationTableAmountData.textContent = formatRupiah(paymentAmount);
  adminReRegistrationStatus.textContent = reRegistrationBadgeData[status].label;

  adminReRegistrationActionReviewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
  adminReRegistrationActionDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  adminReRegistrationTableStatusData.appendChild(adminReRegistrationStatus);
  adminReRegistrationTableActionData.appendChild(adminReRegistrationActionsContainer);

  adminReRegistrationActionsContainer.appendChild(adminReRegistrationActionReviewButton);
  if (!inValidDeleteReRegistrationStatus.includes(status)) adminReRegistrationActionsContainer.appendChild(adminReRegistrationActionDeleteButton);

  adminDashboardManagementTableData.forEach(tableData => adminReRegistrationTableRow.appendChild(tableData));

  reRegistrationTableRowPrivateData.set(adminReRegistrationTableRow, { reRegistrationDocumentId: _id });
  return adminReRegistrationTableRow;
};