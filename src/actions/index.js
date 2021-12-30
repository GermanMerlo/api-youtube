export const saveData = (dataVideos) => {
    return {
        type: 'SAVE_DATA',
        payload: dataVideos
    };
};

export const saveSearchInput = (dataInput) => {
    return {
        type: 'SAVE_SEARCH_INPUT',
        payload: dataInput
    };
};