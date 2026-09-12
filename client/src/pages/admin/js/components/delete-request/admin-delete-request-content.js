import { createElement } from "../../../../../common/js/component-utils.js";
import { formatTanggal } from "../../../../../common/js/formatters.js";

import { deleteRequestTableRowPrivateData } from "../../utilities/delete-request/delete-request-management-utils.js";

import { setDeleteRequests } from "../../utilities/delete-request/delete-request-config.js";
import { updateDeleteRequestTableAndPagination } from "../../utilities/delete-request/update-delete-request-table-pagination.js";

export const createAdminDeleteRequestManagementContent = () => {
  const adminDeleteRequestManagementContent = createElement(
    `<div class="admin-dashboard-management-content admin-dashboard-delete-request-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title">Permintaan Hapus Akun</h2>
              
              <div class="admin-dashboard-management-header-filter-bar admin-dashboard-delete-request-management-header-filter-bar">
                 <button class="button-component button-component-outline button-component-icon refresh-delete-request-button"><i class="fa-solid fa-rotate"></i></button>
              </div>
           </div>

           <section class="admin-dashboard-management-table-container admin-dashboard-delete-request-management-table-container"></section>
        </div>`
  );

  const adminDeleteRequestManagementRefreshButton = adminDeleteRequestManagementContent.querySelector('.refresh-delete-request-button');

  adminDeleteRequestManagementRefreshButton.addEventListener('click', async (event) => {
    event.stopImmediatePropagation();

    await setDeleteRequests();
    updateDeleteRequestTableAndPagination();
  });

  return adminDeleteRequestManagementContent;
};

export const createAdminDeleteRequestManagementTable = () => {
  return createElement(
    `<table class="dashboard-management-table admin-dashboard-management-table admin-dashboard-delete-request-management-table">
               <thead class="admin-dashboard-management-table-head admin-dashboard-delete-request-management-table-head">
                  <tr class="admin-dashboard-management-table-row admin-dashboard-management-table-row">
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Nama</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">NISN</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Tanggal Pengajuan</th>
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header">Aksi</th>
                    </tr>
                </thead>

                <tbody class="dashboard-management-table-body admin-dashboard-management-table-body admin-dashboard-delete-request-management-table-body"></tbody>
            </table>`
  );
};

export const createAdminDeleteRequestManagementTableRow = ({ _id, nisn, name, createdAt }) => {
  const adminDeleteRequestTableRow = document.createElement('tr');

  const adminDeleteRequestTableNameData = document.createElement('td');
  const adminDeleteRequestTableNisnData = document.createElement('td');
  const adminDeleteRequestTableSubmissionDateData = document.createElement('td');
  const adminDeleteRequestTableActionData = document.createElement('td');

  const adminDeleteRequestActionsContainer = document.createElement('div');

  const adminDeleteRequestActionRejectButton = document.createElement('button');
  const adminDeleteRequestActionApproveButton = document.createElement('button');

  const adminDashboardManagementTableData = [adminDeleteRequestTableNameData, adminDeleteRequestTableNisnData, adminDeleteRequestTableSubmissionDateData, adminDeleteRequestTableActionData];
  const adminDashboardManagementActionButtons = [adminDeleteRequestActionRejectButton, adminDeleteRequestActionApproveButton];

  adminDeleteRequestTableRow.classList.add('dashboard-management-table-row', 'admin-dashboard-management-table-row', 'admin-dashboard-delete-request-management-table-row');

  adminDashboardManagementTableData.forEach(tableData => tableData.classList.add('dashboard-management-table-data', 'admin-dashboard-management-table-data'));
  adminDashboardManagementActionButtons.forEach(actionButton => actionButton.classList.add('admin-dashboard-management-action-button', 'admin-dashboard-delete-request-management-action-button', 'button-component', 'button-component-sm'));

  adminDeleteRequestActionRejectButton.classList.add('admin-dashboard-delete-request-management-action-reject-button', 'button-component-danger');
  adminDeleteRequestActionApproveButton.classList.add('admin-dashboard-delete-request-management-action-approve-button', 'button-component-success');

  adminDeleteRequestActionsContainer.classList.add('admin-dashboard-management-actions-container');

  adminDeleteRequestTableNameData.dataset.label = "Nama";
  adminDeleteRequestTableNisnData.dataset.label = "NISN";
  adminDeleteRequestTableSubmissionDateData.dataset.label = "Tanggal Pengajuan";
  adminDeleteRequestTableActionData.dataset.label = "Aksi";

  adminDeleteRequestTableNameData.textContent = name;
  adminDeleteRequestTableNisnData.textContent = nisn;
  adminDeleteRequestTableSubmissionDateData.textContent = formatTanggal(createdAt);

  adminDeleteRequestActionRejectButton.textContent = 'Tolak Penghapusan';
  adminDeleteRequestActionApproveButton.textContent = 'Setujui Penghapusan';

  adminDeleteRequestTableActionData.appendChild(adminDeleteRequestActionsContainer);

  adminDashboardManagementActionButtons.forEach(actionButton => adminDeleteRequestActionsContainer.appendChild(actionButton));
  adminDashboardManagementTableData.forEach(tableData => adminDeleteRequestTableRow.appendChild(tableData));

  deleteRequestTableRowPrivateData.set(adminDeleteRequestTableRow, { deleteRequestDocumentId: _id });
  return adminDeleteRequestTableRow;
};