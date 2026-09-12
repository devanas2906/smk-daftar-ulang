let startDeleteRequestTableRow = 0;
let endDeleteRequestTableRow = 0;

export const setStartEndDeleteRequestTableRow = (startValue, endValue) => {
    startDeleteRequestTableRow = startValue;
    endDeleteRequestTableRow = endValue;
};

export const getStartEndDeleteRequestTableRow = () => {
    return {
        start: startDeleteRequestTableRow,
        end: endDeleteRequestTableRow
    };
};