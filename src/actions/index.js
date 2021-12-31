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

export const videosWatched = (dataInput) => {
    return {
        type: 'SAVE_VIDEOS_WATCHED',
        payload: dataInput
    };
};

export const saveVideoId = (dataInput) => {
    return {
        type: 'SAVE_VIDEO_ID',
        payload: dataInput
    };
};