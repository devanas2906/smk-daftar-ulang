import * as api from "../../admin-api.js";

let reRegistrations = [];

export const setReRegistrations = async (status = "") => {
    const { reRegistrations: resultReRegistrations = [] } = await api.getReRegistrations(status);
    reRegistrations = resultReRegistrations;
};

export const getReRegistrations = () => {
    return { reRegistrations }
};

export const reRegistrationPerPagination = 5;