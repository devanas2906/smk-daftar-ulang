import { appRoot } from "../utilities/dom-refs.js";
import { createStudentRegistrationResultCard } from "../components/student-reregistration-result-card.js";

export const renderStudentRegistrationResultCard = ({ name, note }) => {
    const studentRegistrationResultCard = createStudentRegistrationResultCard({ name, note });
    appRoot.appendChild(studentRegistrationResultCard);
};