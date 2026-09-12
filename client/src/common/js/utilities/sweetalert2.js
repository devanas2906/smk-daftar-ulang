import Swal from "sweetalert2";

export const applySweetalert2Message = (icon, title, message) => Swal.fire({ icon, title, text: message });
export const applySweetalert2Confirm = (icon, title, message, confirmText = "Ya", cancelText = "Batal") => Swal.fire({ icon, title, text: message, showCancelButton: true, confirmButtonText: confirmText, cancelButtonText: cancelText });
export const applySweetalert2Input = (title, input, inputPlaceholder, confirmText = "Ya", cancelText = "Batal") => Swal.fire({ title, input, inputPlaceholder, showCancelButton: true, confirmButtonText: confirmText, cancelButtonText: cancelText });