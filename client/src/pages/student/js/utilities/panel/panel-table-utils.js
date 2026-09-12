let startPanelTableRow = 0;
let endPanelTableRow = 0;

export const setStartEndPanelTableRow = (startValue, endValue) => {
    startPanelTableRow = startValue;
    endPanelTableRow = endValue;
};

export const getStartEndPanelTableRow = () => {
    return {
        start: startPanelTableRow,
        end: endPanelTableRow
    };
};