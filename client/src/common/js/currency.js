export const formatRupiah = (value) => {
    const numeric = String(value).replace(/[^0-9]/g, '');
    if (!numeric) return '';
    return `Rp ${Number(numeric).toLocaleString('id-ID')}`;
};

export const parseRupiah = (formatted) => Number(String(formatted).replace(/[^0-9]/g, '')) || 0;