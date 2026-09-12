import { createElement } from "../../../../common/js/component-utils.js";

export const createNotFoundContainer = () => {
    return createElement(
        `<div class="not-found-container">
            <h1 class="not-found-status-code">404</h1>
            <p class="not-found-title">Halaman Tidak Ditemukan</p>
            <p class="not-found-subtitle">Halaman yang kamu cari tidak ada. Silakan kembali ke halaman utama untuk melanjutkan.</p>

            <a href="/" class="button-component back-button">Kembali ke Beranda</a>
        </div>`
    );
};