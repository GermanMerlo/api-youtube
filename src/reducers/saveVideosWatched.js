const saveVideosWatched = (state = 0, action) => {
  switch (action.type) {
    case 'SAVE_VIDEOS_WATCHED':
      return state + 1;
    default:
      return state;
  }
};

export default saveVideosWatched;