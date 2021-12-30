import saveData from './saveData';
import saveSearchInput from './saveSearchinput';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    allVideos: saveData,
    searchInput: saveSearchInput
});

export default allReducers;