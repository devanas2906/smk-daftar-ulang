export const renderDocumentPreviewItems = (documentPreviewContainer, panelReRegistration = null) => {
    const documentData = [
        { documentLabel: "KTP", documentId: "ktp", documentUrl: panelReRegistration?.kartuTandaPendudukUrl },
        { documentLabel: "Kartu Keluarga", documentId: "kartu-keluarga", documentUrl: panelReRegistration?.kartuKeluargaUrl },
        { documentLabel: "Ijazah SMP", documentId: "ijazah-smp", documentUrl: panelReRegistration?.ijazahSmpUrl },
        { documentLabel: "Bukti Pembayaran", documentId: "bukti-pembayaran", documentUrl: panelReRegistration?.buktiPembayaranUrl },
    ];

    documentPreviewContainer.innerHTML = "";

    for (const data of documentData) {
        const documentPreviewItem = document.createElement('div');
        const documentPreviewItemLabel = document.createElement('span');
        const documentPreviewItemPlaceholder = document.createElement('label');
        const documentPreviewItemInput = document.createElement('input');
        const documentPreviewItemIframe = document.createElement('iframe');
        const documentPreviewItemResetFileButton = document.createElement('button');

        documentPreviewItem.classList.add('document-preview-item');
        documentPreviewItemLabel.classList.add('document-preview-label');
        documentPreviewItemPlaceholder.classList.add('document-preview-placeholder');
        documentPreviewItemInput.classList.add('document-preview-input');
        documentPreviewItemIframe.classList.add('document-preview-iframe');
        documentPreviewItemResetFileButton.classList.add("button-component", "button-component-primary", "document-preview-reset-file-button");

        documentPreviewItemLabel.textContent = data.documentLabel;
        documentPreviewItemPlaceholder.textContent = "+";
        documentPreviewItemPlaceholder.setAttribute("for", data.documentId);

        documentPreviewItemInput.type = "file";
        documentPreviewItemInput.accept = "application/pdf";
        documentPreviewItemInput.id = data.documentId;

        documentPreviewItemIframe.src = data.documentUrl;
        documentPreviewItemResetFileButton.type = "button";
        documentPreviewItemResetFileButton.textContent = "Reset File";

        documentPreviewItem.appendChild(documentPreviewItemLabel);

        documentPreviewItem.appendChild(documentPreviewItemPlaceholder);
        documentPreviewItem.appendChild(documentPreviewItemInput);
        documentPreviewItem.appendChild(documentPreviewItemResetFileButton);

        if (panelReRegistration) {
            documentPreviewItemResetFileButton.classList.add("show");
            documentPreviewItemPlaceholder.classList.add('hide');
            documentPreviewItem.insertBefore(documentPreviewItemIframe, documentPreviewItemResetFileButton);
        };

        documentPreviewContainer.appendChild(documentPreviewItem);

        documentPreviewItemInput.addEventListener('change', uploadDocumentFile);
        documentPreviewItemResetFileButton.addEventListener('click', function () {
            resetPreviewDocumentFile(this);
        });

    };
};

const uploadDocumentFile = (event) => {
    const file = event.target.files[0];

    if (file) {
        const fileURL = URL.createObjectURL(file);

        const documentPreviewItem = event.target.closest('.document-preview-item');
        const documentPreviewItemPlaceholder = documentPreviewItem.querySelector('.document-preview-placeholder');
        const documentPreviewItemIframe = document.createElement('iframe');
        const documentPreviewItemResetFileButton = documentPreviewItem.querySelector('.document-preview-reset-file-button');

        documentPreviewItemIframe.src = fileURL;
        documentPreviewItemIframe.classList.add('document-preview-iframe');
        documentPreviewItemPlaceholder.classList.add('hide');
        documentPreviewItemResetFileButton.classList.add('show');
        documentPreviewItem.insertBefore(documentPreviewItemIframe, documentPreviewItemResetFileButton);

        URL.revokeObjectURL(fileURL);
    };
};

const resetPreviewDocumentFile = (resetFileButton) => {
    const documentPreviewItem = resetFileButton.closest('.document-preview-item');
    const documentPreviewItemPlaceholder = documentPreviewItem.querySelector('.document-preview-placeholder');
    const documentPreviewItemInput = documentPreviewItem.querySelector('.document-preview-input');
    const documentPreviewItemIframe = documentPreviewItem.querySelector('.document-preview-iframe');

    resetFileButton.classList.remove('show');
    documentPreviewItemPlaceholder.classList.remove('hide');
    documentPreviewItemInput.value = "";
    documentPreviewItemIframe?.remove();
};