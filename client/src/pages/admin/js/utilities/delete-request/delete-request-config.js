import * as api from "../../admin-api.js";

let deleteRequests = [];

export const setDeleteRequests = async () => {
    const { deleteRequests: resultDeleteRequests = [] } = await api.getDeleteRequests();
    deleteRequests = resultDeleteRequests;
};

export const getDeleteRequests = () => {
    return { deleteRequests }
};

export const deleteRequestPerPagination = 5;