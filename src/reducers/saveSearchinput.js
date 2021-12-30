const saveInputReducer = (state = '', action) => {
    switch (action.type) {
      case 'SAVE_SEARCH_INPUT':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default saveInputReducer;