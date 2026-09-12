const range = document.createRange();
export const createElement = (htmlString) => range.createContextualFragment(htmlString).firstElementChild;

export const renderForbidden = () => {
    const appRoot = document.getElementById("app-root");
    if (!appRoot) return;

    const forbiddenView = createElement(
        `<div class="forbidden-view">
            <h1 class="forbidden-view-status-code">403</h1>
            <p class="forbidden-view-title">Akses Ditolak</p>
            <p class="forbidden-view-subtitle">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            <a href="/" class="button-component back-button">Kembali ke Beranda</a>
         </div>`
    );

    appRoot.innerHTML = "";
    appRoot.appendChild(forbiddenView);
};
