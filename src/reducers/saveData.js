const saveDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default saveDataReducer;