import { createElement } from "../../../../../common/js/component-utils.js";
import { getFindMasterDataConfig } from "../../utilities/master-data/master-data-management-utils.js";

import { masterDataTableRowPrivateData } from "../../utilities/master-data/master-data-management-utils.js";

export const createAdminMasterDataManagementContent = () => {
   const findMasterDataConfig = getFindMasterDataConfig();

   const adminMasterDataManagementContent = createElement(
      `<div class="admin-dashboard-management-content admin-dashboard-master-data-management-content">
           <div class="admin-dashboard-management-header">
              <h2 class="admin-dashboard-management-title admin-dashboard-master-data-management-title">Data</h2>
              
              <div class="admin-dashboard-management-header-filter-bar admin-dashboard-master-data-management-header-filter-bar">
                 <button class="button-component button-component-primary add-master-data-button"><i class="fa-solid fa-plus"></i> Tambah Data</button>
              </div>
           </div>

           <section class="admin-dashboard-management-table-container admin-dashboard-master-data-management-table-container"></section>
        </div>`
   );

   const masterDataTitle = adminMasterDataManagementContent.querySelector('.admin-dashboard-master-data-management-title');
   const addMasterDataButton = adminMasterDataManagementContent.querySelector('.add-master-data-button');

   masterDataTitle.textContent = findMasterDataConfig.title;
   addMasterDataButton.innerHTML = `<i class="fa-solid fa-plus"></i> Tambah ${findMasterDataConfig.title}`;

   return adminMasterDataManagementContent;
};

export const createAdminMasterDataManagementTable = () => {
   const findMasterDataConfig = getFindMasterDataConfig();

   const adminMasterDataManagementTable = createElement(
      `<table class="dashboard-management-table admin-dashboard-management-table admin-dashboard-master-data-management-table">
               <thead class="admin-dashboard-management-table-head admin-dashboard-master-data-management-table-head">
                  <tr class="admin-dashboard-management-table-row admin-dashboard-management-table-row">
                      <th class="dashboard-management-table-header admin-dashboard-management-table-header admin-dashboard-management-table-header admin-dashboard-management-table-actions-header">Aksi</th>
                  </tr>
                </thead>

                <tbody class="dashboard-management-table-body admin-dashboard-management-table-body admin-dashboard-master-data-management-table-body"></tbody>
            </table>`
   );

   const adminMasterDataManagementTableActionsHeader = adminMasterDataManagementTable.querySelector('.admin-dashboard-management-table-actions-header');
   const adminMasterDataManagementTableRow = adminMasterDataManagementTable.querySelector('.admin-dashboard-management-table-row');

   for (const dataConfigField of findMasterDataConfig.fields) {
      const adminMasterDataManagementTableHeader = document.createElement('th');
      adminMasterDataManagementTableHeader.classList.add('dashboard-management-table-header', 'admin-dashboard-management-table-header', 'admin-dashboard-management-table-header');
      adminMasterDataManagementTableHeader.textContent = dataConfigField.label;
      adminMasterDataManagementTableRow.insertBefore(adminMasterDataManagementTableHeader, adminMasterDataManagementTableActionsHeader);
   };

   return adminMasterDataManagementTable;
};

export const createAdminMasterDataManagementTableRow = (masterData) => {
   const { _id } = masterData;
   const findMasterDataConfig = getFindMasterDataConfig();

   const adminMasterDataTableRow = document.createElement('tr');
   const adminMasterDataTableActionData = document.createElement('td');

   const adminMasterDataActionsContainer = document.createElement('div');

   const adminMasterDataActionEditButton = document.createElement('button');
   const adminMasterDataActionDeleteButton = document.createElement('button');

   const adminDashboardManagementActionButtons = [adminMasterDataActionEditButton, adminMasterDataActionDeleteButton];

   adminMasterDataTableRow.classList.add('dashboard-management-table-row', 'admin-dashboard-management-table-row', 'admin-dashboard-master-data-management-table-row');

   for (const dataConfigField of findMasterDataConfig.fields) {
      const adminMasterDataTableData = document.createElement('td');

      adminMasterDataTableData.classList.add('dashboard-management-table-data', 'admin-dashboard-management-table-data');
      adminMasterDataTableData.textContent = masterData[dataConfigField.key];
      adminMasterDataTableData.dataset.label = dataConfigField.label;

      adminMasterDataTableRow.appendChild(adminMasterDataTableData);
   };

   adminMasterDataTableActionData.classList.add('dashboard-management-table-data', 'admin-dashboard-management-table-data');
   adminMasterDataActionsContainer.classList.add('admin-dashboard-management-actions-container');

   adminDashboardManagementActionButtons.forEach(actionButton => actionButton.classList.add('admin-dashboard-management-action-button', 'admin-dashboard-master-data-management-action-button', 'button-component', 'button-component-sm'));

   adminMasterDataActionEditButton.classList.add('admin-dashboard-master-data-management-action-edit-button', 'button-component-outline');
   adminMasterDataActionDeleteButton.classList.add('admin-dashboard-master-data-management-action-delete-button', 'button-component-danger');

   adminMasterDataTableActionData.dataset.label = "Aksi";

   adminMasterDataActionEditButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
   adminMasterDataActionDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

   adminMasterDataTableActionData.appendChild(adminMasterDataActionsContainer);

   adminDashboardManagementActionButtons.forEach(actionButton => adminMasterDataActionsContainer.appendChild(actionButton));
   adminMasterDataTableRow.appendChild(adminMasterDataTableActionData);

   masterDataTableRowPrivateData.set(adminMasterDataTableRow, { masterDataDocumentId: _id });
   return adminMasterDataTableRow;
};