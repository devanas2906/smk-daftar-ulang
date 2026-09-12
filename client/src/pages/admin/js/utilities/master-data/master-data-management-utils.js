import { getSessionStorageItem } from "../../../../../common/js/auth.js";
import * as api from "../../admin-api.js";

let masterData = {};
export const masterDataTableRowPrivateData = new WeakMap();

const masterDataConfig = {
    major: { title: 'Jurusan', fields: [{ key: 'majorName', label: 'Nama Jurusan' }, { key: 'majorCode', label: 'Kode Jurusan' }] },
    batch: { title: 'Angkatan', fields: [{ key: 'entryYear', label: 'Tahun Masuk' }] },
    class: { title: 'Kelas', fields: [{ key: 'className', label: 'Nama Kelas' }] }
};

const fetchMasterData = async (masterDataTypes = []) => {
    const masterDataPromises = masterDataTypes.map(async masterDataType => {
        return { masterDataType, result: await api.getMasterData(masterDataType) };
    });

    const resultMasterDataPromises = await Promise.all(masterDataPromises);
    const resultMasterData = {};

    for (const resultMasterDataPromise of resultMasterDataPromises) {
        const { masterDataType, result: { masterData } } = resultMasterDataPromise;
        const convertMasterDataType = masterDataType === "major" ? "majors" : masterDataType === "batch" ? "batchs" : "studentClasses";

        resultMasterData[convertMasterDataType] = masterData;
    };

    return resultMasterData;
};

export const setMasterData = async (...masterDataTypes) => masterData = await fetchMasterData(masterDataTypes);
export const getMasterData = () => masterData;

export const getMasterDataKey = () => {
    const activePageSession = getSessionStorageItem('active-page-session') || "major";
    return activePageSession === "major" ? "majors" : activePageSession === "batch" ? "batchs" : "studentClasses";
};

export const getFindMasterDataConfig = () => {
    const activePageSession = getSessionStorageItem('active-page-session');
    return masterDataConfig[activePageSession];
};