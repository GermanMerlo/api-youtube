import saveData from './saveData';
import saveSearchInput from './saveSearchinput';
import saveVideosWatched from './saveVideosWatched';
import saveVideosId from './saveVideoId';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    allVideos: saveData,
    searchInput: saveSearchInput,
    counter: saveVideosWatched,
    videoId: saveVideosId
});

export default allReducers;