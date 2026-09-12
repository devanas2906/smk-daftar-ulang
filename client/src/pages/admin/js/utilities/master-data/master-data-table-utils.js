let startMasterDataTableRow = 0;
let endMasterDataTableRow = 0;

export const setStartEndMasterDataTableRow = (startValue, endValue) => {
    startMasterDataTableRow = startValue;
    endMasterDataTableRow = endValue;
};

export const getStartEndMasterDataTableRow = () => {
    return {
        start: startMasterDataTableRow,
        end: endMasterDataTableRow
    };
};