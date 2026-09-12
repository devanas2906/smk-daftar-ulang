import { getMasterRegisterOptions as fetchMasterRegisterOptions } from "../../../../common/js/api-utils.js";

let masterRegisterOptions = {};

export const setMasterRegisterOptions = async () => masterRegisterOptions = await fetchMasterRegisterOptions();
export const getMasterRegisterOptions = () => masterRegisterOptions;