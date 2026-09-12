const handleMulterError = (error, res) => {
    const multerErrorType = error.code;

    switch (multerErrorType) {
        case "LIMIT_FILE_SIZE": {
            const { field: fieldName } = error;
            let normalizeDocumentLabel = "";

            switch (fieldName) {
                case "kartuTandaPenduduk":
                    normalizeDocumentLabel = "KTP";
                    break;
                case "kartuKeluarga":
                    normalizeDocumentLabel = "Kartu Keluarga";
                    break;
                case "ijazahSmp":
                    normalizeDocumentLabel = "Ijazah";
                    break;
                case "buktiPembayaran":
                    normalizeDocumentLabel = "Bukti Pembayaran";
                    break;
            };

            res.status(400).json({ success: false, message: `Ukuran file ${normalizeDocumentLabel} maksimal 2 megabyte` });
            break;
        };

        default: {
            res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
            break;
        };

    };
};

module.exports = { handleMulterError };