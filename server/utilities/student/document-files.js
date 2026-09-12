const { uploadPdfBuffer, deleteAsset } = require('../../config/cloudinary.js');

const getRetainedDocumentPublicId = (documentPublicIds, retainedDocumentUrls) => {
    return documentPublicIds.filter(documentPublicId => {
        for (const retainedDocumentUrl of retainedDocumentUrls) {
            if (retainedDocumentUrl.includes(documentPublicId)) return true;
        };

        return false;
    });
};

const uploadDocumentFileToCloudinary = (documentFiles) => {
    const uploadDocumentFilePromises = [];
    const documentFolders = { kartuTandaPendudukFolder: 'smk-daftar-ulang/kartu-tanda-penduduk', kartuKeluargaFolder: 'smk-daftar-ulang/kartu-keluarga', ijazahSmpFolder: 'smk-daftar-ulang/ijazah-smp', buktiPembayaranFolder: 'smk-daftar-ulang/bukti-pembayaran' };

    const { kartuTandaPenduduk: kartuTandaPendudukFile, kartuKeluarga: kartuKeluargaFile, ijazahSmp: ijazahSmpFile, buktiPembayaran: buktiPembayaranFile } = documentFiles;
    const { kartuTandaPendudukFolder, kartuKeluargaFolder, ijazahSmpFolder, buktiPembayaranFolder } = documentFolders;

    const timestamp = Date.now();

    if (kartuTandaPendudukFile) uploadDocumentFilePromises.push(uploadPdfBuffer(kartuTandaPendudukFile[0].buffer, kartuTandaPendudukFolder, `kartu-tanda-penduduk-${timestamp}`, 'kartu-tanda-penduduk'));
    if (kartuKeluargaFile) uploadDocumentFilePromises.push(uploadPdfBuffer(kartuKeluargaFile[0].buffer, kartuKeluargaFolder, `kartu-keluarga-${timestamp}`, 'kartu-keluarga'));
    if (ijazahSmpFile) uploadDocumentFilePromises.push(uploadPdfBuffer(ijazahSmpFile[0].buffer, ijazahSmpFolder, `ijazah-smp-${timestamp}`, 'ijazah-smp'));
    if (buktiPembayaranFile) uploadDocumentFilePromises.push(uploadPdfBuffer(buktiPembayaranFile[0].buffer, buktiPembayaranFolder, `bukti-pembayaran-${timestamp}`, 'bukti-pembayaran'));

    return { uploadDocumentFilePromises };
};

const populateDocumentUrlsAndIds = async (documentFiles, targetObject) => {
    const { uploadDocumentFilePromises } = uploadDocumentFileToCloudinary(documentFiles);

    const uploadDocumentFileResultPromises = await Promise.allSettled(uploadDocumentFilePromises);
    const uploadDocumentFileResultFulfilleds = uploadDocumentFileResultPromises.filter(result => result.status === "fulfilled");
    const uploadDocumentFileResultRejecteds = uploadDocumentFileResultPromises.filter(result => result.status === "rejected");

    if (uploadDocumentFileResultRejecteds.length) {
        if (uploadDocumentFileResultFulfilleds.length) {
            const deleteAssetPromises = uploadDocumentFileResultFulfilleds.map(result => result.value).map(result => deleteAsset(result.public_id));
            await Promise.all(deleteAssetPromises);
        };

        throw new Error("Gagal mengunggah dokumen.");
    };

    const uploadDocumentFileResults = uploadDocumentFileResultPromises.map(result => result.value);

    for (const uploadDocumentFileResult of uploadDocumentFileResults) {
        const { public_id, secure_url, tags } = uploadDocumentFileResult;
        const documentType = JSON.parse(tags[0])?.documentType;

        switch (documentType) {
            case "kartu-tanda-penduduk": {
                targetObject.kartuTandaPendudukUrl = secure_url;
                targetObject.kartuTandaPendudukPublicId = public_id;
                break
            };
            case "kartu-keluarga": {
                targetObject.kartuKeluargaUrl = secure_url;
                targetObject.kartuKeluargaPublicId = public_id;
                break
            };
            case "ijazah-smp": {
                targetObject.ijazahSmpUrl = secure_url;
                targetObject.ijazahSmpPublicId = public_id;
                break
            };
            case "bukti-pembayaran": {
                targetObject.buktiPembayaranUrl = secure_url;
                targetObject.buktiPembayaranPublicId = public_id;
                break
            };
        };
    };
};

module.exports = { getRetainedDocumentPublicId, populateDocumentUrlsAndIds };