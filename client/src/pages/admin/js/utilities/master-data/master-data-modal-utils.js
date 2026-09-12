import { getFindMasterDataConfig } from "./master-data-management-utils.js";

export const getMasterPayload = () => {
    const findMasterDataConfig = getFindMasterDataConfig();
    const masterPayload = {};

    for (const field of findMasterDataConfig.fields) {
        const { key: fieldKey } = field;
        const masterDataInputValue = document.getElementById(fieldKey).value.trim();
        masterPayload[fieldKey] = masterDataInputValue;
    };

    return { masterPayload };
};