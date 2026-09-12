import * as api from "../../student-api";

let panelReRegistration = [];

export const setPanelReRegistration = async () => {
    const { reRegistrations: resultReRegistration = [] } = await api.getReRegistrations();
    panelReRegistration = resultReRegistration;
};

export const getPanelReRegistration = () => {
    return { panelReRegistration }
};

export const panelReRegistrationPerPagination = 5;