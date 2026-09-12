import { setMasterRegisterOptions } from "../utilities/register-content.js";
import { renderRegisterContent } from "./render-register.js";

export const initializeRenderRegister = async () => {
    await setMasterRegisterOptions();
    renderRegisterContent();
};