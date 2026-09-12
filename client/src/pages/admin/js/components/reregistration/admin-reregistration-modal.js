import { createElement } from "../../../../../common/js/component-utils.js";
import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import { createPrintUnifiedDocument } from "./admin-reregistration-print.js";
import { renderDocumentPreviewItems, printSingleDocument } from "../../utilities/reregistration/reregistration-modal-utils.js";

import { getMasterData } from "../../utilities/master-data/master-data-management-utils.js";

export const createAdminReRegistrationModal = (reRegistration) => {
    const { student: { name }, kartuTandaPendudukUrl, kartuKeluargaUrl, ijazahSmpUrl, buktiPembayaranUrl, status, note } = reRegistration;

    const adminReRegistrationModal = createElement(
        `<div class="admin-dashboard-modal-overlay admin-dashboard-reregistration-modal-overlay dashboard-modal-overlay modal-overlay-component">
           <div class="admin-dashboard-modal admin-dashboard-reregistration-modal modal-box-component modal-wide-component">
              <h2 class="admin-dashboard-modal-title admin-dashboard-reregistration-modal-title">Tinjau Berkas</h2>

              <div class="admin-dashboard-modal-document-preview-cotainer reregistration-modal-document-preview-cotainer document-preview-cotainer-component"></div>

              <div class="admin-dashboard-modal-actions modal-actions-component justify-content-flex-start"></div>
              <div class="admin-dashboard-modal-actions modal-actions-component justify-content-flex-start"></div>
              <div class="admin-dashboard-modal-actions modal-actions-component justify-content-flex-start"></div>

              <div class="admin-dashboard-modal-actions modal-actions-component">
                 <button type="button" class="cancel-reregistration-modal-button button-component button-component-outline">Tutup</button>
              </div>
            </div> 
        </div>`
    );

    const adminDashboardModal = adminReRegistrationModal.querySelector('.admin-dashboard-reregistration-modal');
    const adminDashboardModalTitle = adminReRegistrationModal.querySelector('.admin-dashboard-reregistration-modal-title');
    const adminDashboardModalDocumentPreviewContainer = adminReRegistrationModal.querySelector('.reregistration-modal-document-preview-cotainer');
    const adminDashboardModalActions = adminReRegistrationModal.querySelectorAll('.admin-dashboard-modal-actions');
    const adminReRegistrationModalCancelButton = adminReRegistrationModal.querySelector('.cancel-reregistration-modal-button');

    adminDashboardModalTitle.textContent = name ? `Tinjau Berkas - ${name}` : "Tinjau Berkas";

    renderDocumentPreviewItems(adminDashboardModalDocumentPreviewContainer, kartuTandaPendudukUrl, kartuKeluargaUrl, ijazahSmpUrl, buktiPembayaranUrl);

    switch (status) {
        case "pending_verification":
        case "pending": {
            const adminReRegistrationModalRejectButton = createAdminReRegistrationModalActionButton("Tolak");
            const adminReRegistrationModalRevisionButton = createAdminReRegistrationModalActionButton("Revisi");
            const adminReRegistrationModalApproveButton = createAdminReRegistrationModalActionButton("Setujui");

            const adminReRegistrationModalPreviewKtpButton = createAdminReRegistrationModalActionButton("Preview KTP", "eye");
            const adminReRegistrationModalPreviewKartuKeluargaButton = createAdminReRegistrationModalActionButton("Preview Kartu Keluarga", "eye");
            const adminReRegistrationModalPreviewIjazahButton = createAdminReRegistrationModalActionButton("Preview Ijazah", "eye");
            const adminReRegistrationModalPreviewBuktiPembayaranButton = createAdminReRegistrationModalActionButton("Preview Bukti Pembayaran", "eye");

            const adminReRegistrationModalActionButtons = [adminReRegistrationModalRevisionButton, adminReRegistrationModalApproveButton];
            const adminReRegistrationModalPreviewDocumentButtons = [adminReRegistrationModalPreviewKtpButton, adminReRegistrationModalPreviewKartuKeluargaButton, adminReRegistrationModalPreviewIjazahButton, adminReRegistrationModalPreviewBuktiPembayaranButton];

            if (status === "pending_verification") {
                const { studentClasses } = getMasterData();
                const adminReRegistrationModalSelectContainer = createAdminReRegistrationModalClassSelectContainer();
                const adminReRegistrationModalClassSelect = adminReRegistrationModalSelectContainer.querySelector('.reregistration-modal-class-select');

                for (const studentClass of studentClasses) {
                    const { _id, className } = studentClass;
                    const adminReRegistrationModalClassOption = createAdminReRegistrationModalClassOption(_id, className);
                    adminReRegistrationModalClassSelect.appendChild(adminReRegistrationModalClassOption);
                };

                adminDashboardModal.insertBefore(adminReRegistrationModalSelectContainer, adminDashboardModalActions[adminDashboardModalActions.length - 1]);
                adminReRegistrationModalActionButtons.unshift(adminReRegistrationModalRejectButton);
            };

            adminReRegistrationModalActionButtons.forEach(adminReRegistrationModalActionButton => adminReRegistrationModalActionButton.classList.add("admin-dashboard-reregistration-management-action-button"));

            adminReRegistrationModalRejectButton.classList.add("reject-document-button", "button-component-danger");
            adminReRegistrationModalRevisionButton.classList.add("revision-document-button", "button-component-revision");
            adminReRegistrationModalApproveButton.classList.add("approve-document-button", "button-component-success");

            adminReRegistrationModalPreviewKtpButton.dataset.documentUrl = kartuTandaPendudukUrl;
            adminReRegistrationModalPreviewKartuKeluargaButton.dataset.documentUrl = kartuKeluargaUrl;
            adminReRegistrationModalPreviewIjazahButton.dataset.documentUrl = ijazahSmpUrl;
            adminReRegistrationModalPreviewBuktiPembayaranButton.dataset.documentUrl = buktiPembayaranUrl;

            adminReRegistrationModalActionButtons.forEach(actionButton => adminDashboardModalActions[adminDashboardModalActions.length - 1].insertBefore(actionButton, adminReRegistrationModalCancelButton));

            for (const previewDocumentButton of adminReRegistrationModalPreviewDocumentButtons) {
                previewDocumentButton.classList.add('print-document-button', 'button-component-outline', 'button-component-sm');
                adminDashboardModalActions[2].appendChild(previewDocumentButton);

                previewDocumentButton.addEventListener('click', function (event) {
                    event.stopImmediatePropagation();

                    const documentUrl = this.dataset.documentUrl;
                    window.open(documentUrl, "_blank");
                });
            };

            break;
        };
        case "approved": {
            const adminReRegistrationModalPrintUnifiedButton = createAdminReRegistrationModalActionButton("Cetak Dokumen Verifikasi", "print");

            const adminReRegistrationModalPrintKtpButton = createAdminReRegistrationModalActionButton("Cetak KTP", "print");
            const adminReRegistrationModalPrintKartuKeluargaButton = createAdminReRegistrationModalActionButton("Cetak Kartu Keluarga", "print");
            const adminReRegistrationModalPrintIjazahButton = createAdminReRegistrationModalActionButton("Cetak Ijazah", "print");
            const adminReRegistrationModalPrintBuktiPembayaranButton = createAdminReRegistrationModalActionButton("Cetak Bukti Pembayaran", "print");

            const adminReRegistrationModalPrintDocumentButtons = [adminReRegistrationModalPrintKtpButton, adminReRegistrationModalPrintKartuKeluargaButton, adminReRegistrationModalPrintIjazahButton, adminReRegistrationModalPrintBuktiPembayaranButton];

            adminDashboardModalActions[0].appendChild(adminReRegistrationModalPrintUnifiedButton);
            adminReRegistrationModalPrintUnifiedButton.classList.add('print-document-unified-button', 'button-component-outline', 'button-component-sm');
            adminReRegistrationModalPrintUnifiedButton.addEventListener('click', async (event) => {
                event.stopImmediatePropagation();

                const printUnifiedDocument = await createPrintUnifiedDocument(reRegistration);
                document.body.appendChild(printUnifiedDocument);
                window.print();
            });

            adminReRegistrationModalPrintKtpButton.dataset.documentUrl = kartuTandaPendudukUrl;
            adminReRegistrationModalPrintKartuKeluargaButton.dataset.documentUrl = kartuKeluargaUrl;
            adminReRegistrationModalPrintIjazahButton.dataset.documentUrl = ijazahSmpUrl;
            adminReRegistrationModalPrintBuktiPembayaranButton.dataset.documentUrl = buktiPembayaranUrl;

            for (const printDocumentButton of adminReRegistrationModalPrintDocumentButtons) {
                printDocumentButton.classList.add('print-document-button', 'button-component-outline', 'button-component-sm');
                adminDashboardModalActions[1].appendChild(printDocumentButton);

                printDocumentButton.addEventListener('click', async function (event) {
                    event.stopImmediatePropagation();

                    const documentUrl = this.dataset.documentUrl;
                    updateButtonState(this, true);

                    try {
                        await printSingleDocument(documentUrl);
                    } finally {
                        updateButtonState(this, false);
                    };
                });
            };

            break;
        };

        case "revision":
        case "rejected": {
            const adminReRegistrationModalDocumentNote = document.createElement('p');
            adminReRegistrationModalDocumentNote.classList.add('document-note');
            adminReRegistrationModalDocumentNote.textContent = note;
            adminDashboardModalActions[0].appendChild(adminReRegistrationModalDocumentNote);
            break;
        };
    };

    adminReRegistrationModalCancelButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        document.body.classList.remove('overflow-hidden');
        adminReRegistrationModal.remove();
    });

    return adminReRegistrationModal;
};

const createAdminReRegistrationModalActionButton = (label, icon) => {
    const iconButton = icon ? `<i class="fa-solid fa-${icon}"></i>` : "";
    const adminReRegistrationModalActionButton = createElement(`<button type="button" class="button-component"></button>`);

    adminReRegistrationModalActionButton.innerHTML = `${iconButton}${label}`;
    return adminReRegistrationModalActionButton;
};

const createAdminReRegistrationModalClassSelectContainer = () => {
    return createElement(
        `<div class="admin-dashboard-modal-select-container reregistration-modal-class-select-container">
            <label for="class">Kelas</label>
            <select id="class" class="reregistration-modal-select reregistration-modal-class-select"><option value="" selected disabled>Pilih Kelas</option></select>
        </div>`
    );
};

const createAdminReRegistrationModalClassOption = (_id, label) => {
    const adminReRegistrationModalClassOption = createElement(`<option></option>`);

    adminReRegistrationModalClassOption.value = _id;
    adminReRegistrationModalClassOption.textContent = label;

    return adminReRegistrationModalClassOption;
};