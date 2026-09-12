import * as api from "../../admin-api.js";

let students = [];

export const setStudents = async (filters = {}) => {
    const { students: resultStudents = [] } = await api.getStudents(filters);
    students = resultStudents;
};

export const getStudents = () => {
    return { students }
};

export const studentPerPagination = 5;