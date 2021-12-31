const saveDataReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SAVE_DATA':
      return state + 1;
    default:
      return state;
  }
};

export default saveDataReducer;