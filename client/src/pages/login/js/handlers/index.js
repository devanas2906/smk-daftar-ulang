import { handleLoginSubmit } from "./login-submit.js";
import { handleChangePasswordSubmit } from "./change-password-submit.js";

import { initializeForgotPasswordHandlers } from "./forgot-password/index.js";

export const initializeLoginHandlers = () => {
    handleLoginSubmit();
    handleChangePasswordSubmit();
    initializeForgotPasswordHandlers();
};