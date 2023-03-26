import { combineReducers } from 'redux';
import popup from './Slices/popupSlice';

const combinedReducer = combineReducers({
    popup
});

export default combinedReducer;