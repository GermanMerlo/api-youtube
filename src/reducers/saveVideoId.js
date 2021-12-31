const saveVideosId = (state = '', action) => {
    switch (action.type) {
      case 'SAVE_VIDEO_ID':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default saveVideosId;