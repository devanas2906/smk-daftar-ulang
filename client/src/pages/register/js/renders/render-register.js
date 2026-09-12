import { getSessionStorageItem } from "../../../../common/js/auth.js";
import { appRoot } from "../utilities/dom-refs.js";

import { createRegisterContent } from "../components/register-content.js";
import { createRegisterSendOtpContent, createRegisterOtpVerificationContent } from "../components/register-otp.js";

import { applySwiperToRegisterInputGroup } from "../utilities/register-input-group.js";

export const renderRegisterContent = () => {
    const otpRegisterStatus = getSessionStorageItem("otp-register-status");

    appRoot.innerHTML = "";

    switch (otpRegisterStatus) {
        case "verified-otp": {
            const registerContent = createRegisterContent();
            appRoot.appendChild(registerContent);

            applySwiperToRegisterInputGroup();
            break;
        };
        case "verify-otp": {
            const registerOtpVerificationContent = createRegisterOtpVerificationContent();
            appRoot.appendChild(registerOtpVerificationContent);
            break;
        };
        default: {
            const registerSendOtpContent = createRegisterSendOtpContent();
            appRoot.appendChild(registerSendOtpContent);
        };
    };
};