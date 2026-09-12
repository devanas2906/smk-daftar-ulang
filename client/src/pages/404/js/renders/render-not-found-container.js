import { appRoot } from "../utilities/dom-refs.js";
import { createNotFoundContainer } from "../components/not-found-container.js";

export const renderNotFoundContainer = () => {
    const notFoundContainer = createNotFoundContainer();
    appRoot.appendChild(notFoundContainer);
};