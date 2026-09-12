import { createElement } from "./component-utils.js";
import { getSchoolProfile } from "./api-utils.js";
import { formatRupiah } from "./currency.js";

export const getSchoolData = async () => {
    const { schools: { schoolAddress, schoolEmail, schoolNumberPhone } } = await getSchoolProfile();

    return [
        { icon: "<i class='fa-solid fa-location-dot'></i>", type: "address", content: schoolAddress },
        { icon: "<i class='fa-solid fa-phone'></i>", type: "number-phone", content: schoolNumberPhone },
        { icon: "<i class='fa-solid fa-envelope'></i>", type: "email", content: schoolEmail }
    ];
};

export const getDocumentData = (student, paymentAmount) => {
    const { class: { className }, major: { majorName }, batch: { entryYear }, name, nisn, parentName, address } = student;

    return [
        { label: "Nama", data: name },
        { label: "NISN", data: nisn },
        { label: "Kelas", data: className },
        { label: "Jurusan", data: majorName },
        { label: "Angkatan", data: entryYear },
        { label: "Nama Orang Tua", data: parentName },
        { label: "Alamat", data: address },
        { label: "Jumlah Bayar", data: formatRupiah(paymentAmount) }
    ];
};

export const waitForImage = (imgElement) => {
    return new Promise((resolve) => {
        if (imgElement.complete) return resolve(true);
        imgElement.addEventListener('load', () => resolve(true));
    });
};

export const createPrintDocumentContactItem = ({ icon, type, content }) => {
    const printDocumentContactItem = createElement(`<div class="print-document-contact-item"></div>`);

    printDocumentContactItem.classList.add(`print-document-contact-${type}-item`);
    printDocumentContactItem.innerHTML = `${icon} ${content}`;

    return printDocumentContactItem;
};

export const createPrintDocumentDataItem = ({ label, data }) => {
    const printDocumentDataItem = createElement(`<div class="print-document-data-item"></div>`);
    const printDocumentDataLabel = createElement(`<span class="print-document-data-label"></span>`);
    const printDocumentDataValue = createElement(`<span class="print-document-data-value"></span>`);

    printDocumentDataLabel.textContent = `${label}:`;
    printDocumentDataValue.textContent = `${data}`;

    printDocumentDataItem.appendChild(printDocumentDataLabel);
    printDocumentDataItem.appendChild(printDocumentDataValue);

    return printDocumentDataItem;
};