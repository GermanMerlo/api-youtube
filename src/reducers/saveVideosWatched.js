const saveVideosWatched = (state = 1, action) => {
  switch (action.type) {
    case 'SAVE_VIDEOS_WATCHED':
      return state + 1;
    default:
      return state;
  }
};

export default saveVideosWatched;