import { createElement } from "../../../../../common/js/component-utils.js";

import { getFindMasterDataConfig } from "../../utilities/master-data/master-data-management-utils.js";

export const createAdminMasterDataModal = (masterData = null) => {
    const findMasterDataConfig = getFindMasterDataConfig();

    const adminMasterDataModal = createElement(
        `<div class="admin-dashboard-modal-overlay admin-dashboard-master-data-modal-overlay dashboard-modal-overlay modal-overlay-component">
           <div class="admin-dashboard-modal admin-dashboard-master-data-modal modal-box-component">
              <h2 class="admin-dashboard-modal-title admin-dashboard-master-data-modal-title">Tinjau Berkas</h2>

              <form class="admin-dashboard-modal-form admin-dashboard-master-data-modal-form">
                 <div class="admin-dashboard-modal-actions modal-actions-component">
                    <button type="button" class="cancel-master-data-modal-button button-component button-component-outline">Tutup</button>
                    <button type="submit" class="save-master-data-modal-button button-component button-component-primary">Simpan</button>
                 </div>
              </form>
            </div> 
        </div>`
    );

    const adminDashboardMasterDataModalTitle = adminMasterDataModal.querySelector('.admin-dashboard-master-data-modal-title');
    const adminDashboardMasterDataModalActions = adminMasterDataModal.querySelector('.admin-dashboard-modal-actions');
    const adminDashboardMasterDataModalForm = adminMasterDataModal.querySelector('.admin-dashboard-master-data-modal-form');
    const adminMasterDataModalCancelButton = adminMasterDataModal.querySelector('.cancel-master-data-modal-button');

    adminDashboardMasterDataModalTitle.textContent = findMasterDataConfig ? findMasterDataConfig.title : "Data";

    for (const dataConfigField of findMasterDataConfig.fields) {
        const { key: fieldKey, label: fieldLabel } = dataConfigField;
        const adminDashboardMasterDataModalLabel = document.createElement('label');
        const adminDashboardMasterDataModalInput = document.createElement('input');

        adminDashboardMasterDataModalInput.classList.add('admin-dashboard-modal-input');

        adminDashboardMasterDataModalLabel.for = fieldKey;
        adminDashboardMasterDataModalLabel.textContent = fieldLabel;

        adminDashboardMasterDataModalInput.id = fieldKey;
        adminDashboardMasterDataModalInput.placeholder = fieldLabel;
        adminDashboardMasterDataModalInput.value = masterData ? masterData[fieldKey] : "";
        adminDashboardMasterDataModalInput.required = true;

        adminDashboardMasterDataModalForm.insertBefore(adminDashboardMasterDataModalLabel, adminDashboardMasterDataModalActions);
        adminDashboardMasterDataModalForm.insertBefore(adminDashboardMasterDataModalInput, adminDashboardMasterDataModalActions);
    };

    adminMasterDataModalCancelButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        document.body.classList.remove('overflow-hidden');
        adminMasterDataModal.remove();
    });

    return adminMasterDataModal;
};