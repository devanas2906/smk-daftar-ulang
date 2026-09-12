import * as api from "../../student-api.js";

import { applySweetalert2Message, applySweetalert2Confirm } from "../../../../../common/js/utilities/sweetalert2.js";

export const handleStudentRequestDeleteAccount = () => {
    document.body.addEventListener('click', async function (event) {
        const requestDeleteAccountButton = event.target.closest('.student-request-delete-account-button');

        if (requestDeleteAccountButton) {
            event.stopImmediatePropagation();

            try {
                const responseSweetalert2 = await applySweetalert2Confirm('warning', 'Minta Hapus Akun?', 'Permintaan akan dikirim ke admin untuk ditinjau.', 'Ya, Ajukan', 'Batal');
                if (!responseSweetalert2.isConfirmed) return;

                const { message } = await api.requestDeleteAccount();
                applySweetalert2Message('success', 'Berhasil', message);
            } catch (error) {
                applySweetalert2Message('error', 'Gagal', error.message);
            };

        };

    });
};