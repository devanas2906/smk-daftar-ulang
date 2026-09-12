export const formatTanggal = (isoDate) =>
    new Date(isoDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

export const formatDateWithoutTime = (isoDate) =>
    new Date(isoDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

export const getInitial = (name = '') => name.trim().charAt(0).toUpperCase() || '?';