import { parseRupiah } from "../../../../../common/js/currency.js";

import { createStudentPanelReRegistrationModal } from "../../components/panel/student-panel-modal.js";

import { panelReRegistrationTableRowPrivateData } from "../../utilities/panel/panel-management-utils.js";
import { setFormModalMode, getFormModalMode, setActiveDataDocumentId, getActiveDataDocumentId } from "../../utilities/modal-utils.js";

import { setPanelReRegistration } from "../../utilities/panel/panel-config.js";
import { updatePanelTableAndPagination } from "../../utilities/panel/update-panel-table-pagination.js";

import * as api from "../../student-api.js";

import { updateButtonState } from "../../../../../common/js/button-state-utils.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentPanelReRegistrationModal = () => {
    document.body.addEventListener('click', async function (event) {
        const addDocumentButton = event.target.closest('.add-panel-reregistration-button');
        const editDocumentButton = event.target.closest('.student-dashboard-panel-management-action-edit-button');

        if (addDocumentButton) {
            event.stopImmediatePropagation();

            const studentPanelReRegistrationModal = createStudentPanelReRegistrationModal();
            this.appendChild(studentPanelReRegistrationModal);
            this.classList.add('overflow-hidden');
            setFormModalMode("add");
        };

        if (editDocumentButton) {
            event.stopImmediatePropagation();

            const validEditReRegistrationStatus = ["draft", "revision"];

            try {
                const { reRegistrations } = await api.getReRegistrations();
                const studentPanelReRegistrationTableRow = editDocumentButton.closest('.student-dashboard-panel-management-table-row');
                const { panelReRegistrationDocumentId } = panelReRegistrationTableRowPrivateData.get(studentPanelReRegistrationTableRow);

                const findReRegistrationDocument = reRegistrations.find(reRegistration => reRegistration._id === panelReRegistrationDocumentId);
                if (!validEditReRegistrationStatus.includes(findReRegistrationDocument?.status)) return applySweetalert2Message('error', 'Tidak bisa edit berkas', 'Berkas daftar ulang Anda sudah diproses.');

                const studentPanelReRegistrationModal = createStudentPanelReRegistrationModal(findReRegistrationDocument);
                this.appendChild(studentPanelReRegistrationModal);
                this.classList.add('overflow-hidden');

                setActiveDataDocumentId(panelReRegistrationDocumentId);
                setFormModalMode("edit");
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };
        };

    });
};

export const handleStudentPanelReRegistrationModalForm = () => {
    document.body.addEventListener('submit', async function (event) {
        const studentPanelModalForm = event.target.closest('.student-dashboard-panel-modal-form');

        if (studentPanelModalForm) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const studentPanelModal = this.querySelector('.student-dashboard-panel-reregistration-modal-overlay');
            const studentPanelModalSaveButton = this.querySelector('.save-panel-reregistration-modal-button');

            const formData = new FormData();
            const formModalMode = getFormModalMode();

            const paymentAmount = parseRupiah(this.querySelector('#pay-amount').value);
            const modeDraft = this.querySelector('#draft-option');

            const kartuTandaPendudukFile = this.querySelector('#ktp').files[0];
            const kartuKeluargaFile = this.querySelector('#kartu-keluarga').files[0];
            const ijazahSmpFile = this.querySelector('#ijazah-smp').files[0];
            const buktiPembayaranFile = this.querySelector('#bukti-pembayaran').files[0];

            const isDocumentCompleted = this.querySelectorAll('.document-preview-iframe').length >= 4;

            if (!paymentAmount || paymentAmount <= 0) return applySweetalert2Message('warning', 'Periksa Kembali', 'Jumlah bayar wajib diisi.');
            if (!isDocumentCompleted) return applySweetalert2Message('warning', 'Berkas Belum Lengkap', 'KTP, KK, Ijazah dan Bukti Pembayaran wajib diunggah dalam format PDF.');

            if (modeDraft) {
                if (!modeDraft.checked) {
                    const responseSweetalert2 = await applySweetalert2Confirm("question", "Yakin", "Apakah Anda yakin ingin menonaktifkan draft mode? Ini akan membuat dokumen daftar ulang anda langsung terkirim.", "Ya", "Batal");
                    if (!responseSweetalert2.isConfirmed) return;
                } else {
                    formData.set('modeDraft', "draft");
                };
            };

            formData.set('paymentAmount', paymentAmount);
            formData.set('kartuTandaPenduduk', kartuTandaPendudukFile);
            formData.set('kartuKeluarga', kartuKeluargaFile);
            formData.set('ijazahSmp', ijazahSmpFile);
            formData.set('buktiPembayaran', buktiPembayaranFile);

            updateButtonState(studentPanelModalSaveButton, true);

            try {
                if (formModalMode === "edit") {
                    const activeUserDocumentId = getActiveDataDocumentId();
                    const sourceDocumentFiles = [...this.querySelectorAll('.document-preview-iframe')]
                        .map(previewIframe => {
                            return previewIframe.src;
                        }).filter(sourceFile => {
                            return sourceFile.startsWith('https') || sourceFile.startsWith('http');
                        });

                    formData.set('files', JSON.stringify(sourceDocumentFiles));

                    const { message } = await api.updateReRegistration(formData, activeUserDocumentId);
                    applySweetalert2Message('success', 'Berhasil', message);
                } else {
                    const { message } = await api.submitReRegistration(formData);
                    applySweetalert2Message('success', 'Berhasil', message);
                };

                studentPanelModal.remove();
                this.classList.remove('overflow-hidden');

                await setPanelReRegistration();
                updatePanelTableAndPagination();
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            } finally {
                updateButtonState(studentPanelModalSaveButton, false);
            };

        };
    });
};