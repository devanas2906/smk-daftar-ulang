import { logout } from "../../../../../common/js/auth.js";

import * as api from "../../student-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentDeleteAccount = () => {
    document.body.addEventListener('click', async function (event) {
        const deleteAccountButton = event.target.closest('.student-dashboard-notification-delete-account-button');

        if (deleteAccountButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('error', 'Hapus Akun Permanen?', 'Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus.', 'Ya, Hapus Permanen', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const { message } = await api.executeDeleteAccount();
                await applySweetalert2Message('success', 'Berhasil', message);
                logout();
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };

        };

    });
};