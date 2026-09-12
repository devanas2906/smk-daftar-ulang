import { appRoot } from "../utilities/dom-refs.js";
import { createLoginContent } from "../components/login-content.js";

export const renderLoginContent = () => {
    const loginContent = createLoginContent();
    appRoot.innerHTML = "";

    appRoot.appendChild(loginContent);
};