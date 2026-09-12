export const updateButtonState = (button, loading) => {
    button.classList.toggle('apply-metadata', loading);
    button.classList.toggle('apply-loading', loading);
    button.classList.toggle('apply-loading-background', loading);
};