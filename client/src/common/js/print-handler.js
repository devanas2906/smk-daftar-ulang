export const handleAfterPrintHandler = () => {
    window.addEventListener("afterprint", () => {
        const printDocument = document.querySelector('.print-document');
        printDocument?.remove();
    });
};
