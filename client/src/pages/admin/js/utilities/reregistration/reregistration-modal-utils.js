export const renderDocumentPreviewItems = (documentPreviewContainer, kartuTandaPendudukUrl, kartuKeluargaUrl, ijazahSmpUrl, buktiPembayaranUrl) => {
    const documentData = [
        { documentLabel: "KTP", documentUrl: kartuTandaPendudukUrl },
        { documentLabel: "Kartu Keluarga", documentUrl: kartuKeluargaUrl },
        { documentLabel: "Ijazah SMP", documentUrl: ijazahSmpUrl },
        { documentLabel: "Bukti Pembayaran", documentUrl: buktiPembayaranUrl },
    ];

    documentPreviewContainer.innerHTML = "";

    for (const data of documentData) {
        const documentPreviewItem = document.createElement('div');
        const documentPreviewItemLabel = document.createElement('span');
        const documentPreviewItemIframe = document.createElement('iframe');

        documentPreviewItem.classList.add('document-preview-item');
        documentPreviewItemLabel.classList.add('document-preview-label');
        documentPreviewItemIframe.classList.add('document-preview-iframe');

        documentPreviewItemLabel.textContent = data.documentLabel;
        documentPreviewItemIframe.src = data.documentUrl;

        documentPreviewItem.appendChild(documentPreviewItemLabel);
        documentPreviewItem.appendChild(documentPreviewItemIframe);
        documentPreviewContainer.appendChild(documentPreviewItem);
    };
};

export const printSingleDocument = async (documentUrl) => {
    const responseDocument = await fetch(documentUrl);
    const documentBlob = await responseDocument.blob();
    const documentTemporaryUrl = URL.createObjectURL(documentBlob);

    const documentIframe = document.createElement('iframe');
    documentIframe.style.display = "none";
    documentIframe.src = documentTemporaryUrl;
    documentIframe.classList.add('document-iframe-item');

    documentIframe.addEventListener('load', function (event) {
        event.stopImmediatePropagation();

        this.contentWindow.focus();
        this.contentWindow.print();
        URL.revokeObjectURL(documentTemporaryUrl);

        document.addEventListener('click', removeDocumentIframe);
    });

    document.body.appendChild(documentIframe);
};

// utilities
const removeDocumentIframe = () => {
    const documentIframe = document.querySelector('.document-iframe-item');

    documentIframe?.remove();
    document.removeEventListener("click", removeDocumentIframe);
};