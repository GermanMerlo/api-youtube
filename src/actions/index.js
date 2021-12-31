export const savedata = () => {
    return {
        type: 'SAVE_DATA'
    };
};

export const savesearchinput = (dataInput) => {
    return {
        type: 'SAVE_SEARCH_INPUT',
        payload: dataInput
    };
};