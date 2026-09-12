let startReRegistrationTableRow = 0;
let endReRegistrationTableRow = 0;

export const setStartEndReRegistrationTableRow = (startValue, endValue) => {
    startReRegistrationTableRow = startValue;
    endReRegistrationTableRow = endValue;
};

export const getStartEndReRegistrationTableRow = () => {
    return {
        start: startReRegistrationTableRow,
        end: endReRegistrationTableRow
    };
};