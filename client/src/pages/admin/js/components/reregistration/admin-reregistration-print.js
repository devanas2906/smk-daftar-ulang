import { createElement } from "../../../../../common/js/component-utils.js";
import { formatDateWithoutTime } from "../../../../../common/js/formatters.js";

import { getSchoolProfile } from "../../../../../common/js/api-utils.js";
import { getSchoolData, getDocumentData, waitForImage, createPrintDocumentContactItem, createPrintDocumentDataItem } from "../../../../../common/js/print-utils.js";

import schoolLogo from "../../../../../../../assets/images/logo/school-logo.png";

export const createPrintUnifiedDocument = async (reRegistration) => {
  const student = reRegistration.student;
  const { verificationDate, paymentAmount } = reRegistration;

  const { schools: { schoolName, principalName, treasurerName } } = await getSchoolProfile();
  const schoolData = await getSchoolData();
  const documentData = getDocumentData(student, paymentAmount);

  const printUnifiedDocument = createElement(
    `<div class="print-document">
        <div class="print-document-header">
          <img src="${schoolLogo}" alt="School Logo" class="print-document-logo">
          <h1 class="print-document-title">${schoolName || "Sekolah"}</h1>
          <div class="print-document-contact-container"></div>
        </div>
  
        <div class="print-document-receipt-title">Bukti Pembayaran dan Verifikasi Daftar Ulang</div>
        <div class="print-document-introduction-text">Siswa dengan data sebagai berikut:</div>

        <div class="print-document-data-container"></div>
  
        <p class="print-document-declaration">Dengan ini menerangkan bahwa siswa tersebut diatas telah melakukan daftar ulang dan telah disetujui oleh pihak sekolah.</p>
        <p class="print-document-signature-approve-time">${formatDateWithoutTime(verificationDate) || "-"}</p>
        
        <div class="print-document-signature-area">
           <p class="print-document-signature-area-introduction-label">Mengetahui,</p>

            <div class="print-document-signature-area-container">
               <div class="print-document-signature-area-item">
                  <span class="print-document-signature-area-sub-title">Kepala Sekolah</span>
                  <span class="print-document-signature-area-label">( Tanda Tangan )</span>
                  <span class="print-document-signature-area-name">${principalName}</span>
               </div>

               <div class="print-document-signature-area-item">
                  <span class="print-document-signature-area-sub-title">Bendahara Sekolah</span>
                  <span class="print-document-signature-area-label">( Tanda Tangan )</span>
                  <span class="print-document-signature-area-name">${treasurerName}</span>
               </div>
            </div>
        </div>
      </div>`
  );

  const printDocumentLogo = printUnifiedDocument.querySelector('.print-document-logo');
  const printDocumentContactContainer = printUnifiedDocument.querySelector('.print-document-contact-container');
  const printDocumentDataContainer = printUnifiedDocument.querySelector('.print-document-data-container');

  await waitForImage(printDocumentLogo);

  schoolData.forEach(data => {
    const schoolDataItem = createPrintDocumentContactItem(data);
    printDocumentContactContainer.appendChild(schoolDataItem);
  });

  documentData.forEach(data => {
    const documentDataItem = createPrintDocumentDataItem(data);
    printDocumentDataContainer.appendChild(documentDataItem);
  });

  return printUnifiedDocument;
};