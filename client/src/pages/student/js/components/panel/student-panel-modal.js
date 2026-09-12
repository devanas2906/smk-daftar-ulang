import { createElement } from "../../../../../common/js/component-utils.js";
import { formatRupiah } from "../../../../../common/js/currency.js";

import { renderDocumentPreviewItems } from "../../utilities/panel/panel-modal-utils.js";

export const createStudentPanelReRegistrationModal = (panelReRegistration = null) => {
   const studentPanelReRegistrationModal = createElement(
      `<div class="student-dashboard-modal-overlay student-dashboard-panel-reregistration-modal-overlay dashboard-modal-overlay modal-overlay-component">
           <div class="student-dashboard-modal student-dashboard-panel-reregistration-modal modal-box-component modal-wide-component">
              <h2 class="student-dashboard-modal-title student-dashboard-panel-reregistration-modal-title">Daftar Ulang</h2>

              <form class="student-dashboard-modal-form student-dashboard-panel-modal-form">
                 <div class="student-dashboard-modal-document-preview-cotainer panel-reregistration-modal-document-preview-cotainer document-preview-cotainer-component"></div>

                 <div class="student-dashboard-modal-input-group-item">
                    <label for="pay-amount">Jumlah Bayar</label>
                    <input type="text" id="pay-amount" inputmode="numeric" class="student-dashboard-modal-input student-dashboard-modal-pay-amount-input" placeholder="Rp. 0" required />
                 </div>

                 <div class="student-dashboard-modal-actions modal-actions-component">
                    <button type="button" class="cancel-panel-reregistration-modal-button button-component button-component-outline">Tutup</button>
                    <button type="submit" class="save-panel-reregistration-modal-button button-component button-component-primary">Kirim Pengajuan</button>
                 </div>
              </form>
            </div> 
        </div>`
   );

   const studentDashboardModalTitle = studentPanelReRegistrationModal.querySelector('.student-dashboard-panel-reregistration-modal-title');
   const studentDashboardModalDocumentPreviewContainer = studentPanelReRegistrationModal.querySelector('.panel-reregistration-modal-document-preview-cotainer');
   const studentDashboardModalPaymentAmountInput = studentPanelReRegistrationModal.querySelector('.student-dashboard-modal-pay-amount-input');
   const studentPanelReRegistrationModalCancelButton = studentPanelReRegistrationModal.querySelector('.cancel-panel-reregistration-modal-button');
   const studentPanelReRegistrationModalSaveButton = studentPanelReRegistrationModal.querySelector('.save-panel-reregistration-modal-button');

   studentDashboardModalTitle.textContent = panelReRegistration ? `Ubah Daftar Ulang` : "Buat Daftar Ulang";
   studentDashboardModalPaymentAmountInput.value = panelReRegistration ? formatRupiah(panelReRegistration.paymentAmount) : "";

   renderDocumentPreviewItems(studentDashboardModalDocumentPreviewContainer, panelReRegistration);

   if (!panelReRegistration || panelReRegistration?.status === "draft") {
      const studentDashboardModalForm = studentPanelReRegistrationModal.querySelector('.student-dashboard-modal-form');
      const studentDashboardModalActions = studentPanelReRegistrationModal.querySelector('.student-dashboard-modal-actions');

      const studentDashboardModalDraftOption = createStudentDashboardModalDraftOption();
      const studentDashboardModalDraftOptionInput = studentDashboardModalDraftOption.querySelector('.student-dashboard-modal-draft-option-input');

      studentDashboardModalForm.insertBefore(studentDashboardModalDraftOption, studentDashboardModalActions);

      studentPanelReRegistrationModalSaveButton.textContent = reRegistrationModalSaveTextButton(studentDashboardModalDraftOptionInput);

      studentDashboardModalDraftOptionInput.addEventListener('change', function (event) {
         event.stopImmediatePropagation();
         studentPanelReRegistrationModalSaveButton.textContent = reRegistrationModalSaveTextButton(this);
      });

   } else {
      studentPanelReRegistrationModalSaveButton.textContent = reRegistrationModalSaveTextButton();
   };

   studentDashboardModalPaymentAmountInput.addEventListener('input', function (event) {
      event.stopImmediatePropagation();
      this.value = formatRupiah(this.value);
   });

   studentPanelReRegistrationModalCancelButton.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      document.body.classList.remove('overflow-hidden');
      studentPanelReRegistrationModal.remove();
   });

   return studentPanelReRegistrationModal;
};

const createStudentDashboardModalDraftOption = () => {
   return createElement(
      `<div class="student-dashboard-modal-input-group-item student-dashboard-modal-draft-option-input-group-item">
          <label for="draft-option">Aktifkan Mode Draft</label>
          <input type="checkbox" id="draft-option" value="draft" class="student-dashboard-modal-input student-dashboard-modal-draft-option-input" checked />
       </div>`
   );
};

const reRegistrationModalSaveTextButton = (draftOptionInput = null) => draftOptionInput && draftOptionInput.checked ? "Simpan Perubahan" : "Kirim Pengajuan";