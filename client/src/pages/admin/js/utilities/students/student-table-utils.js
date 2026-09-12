let startStudentTableRow = 0;
let endStudentTableRow = 0;

export const setStartEndStudentTableRow = (startValue, endValue) => {
    startStudentTableRow = startValue;
    endStudentTableRow = endValue;
};

export const getStartEndStudentTableRow = () => {
    return {
        start: startStudentTableRow,
        end: endStudentTableRow
    };
};