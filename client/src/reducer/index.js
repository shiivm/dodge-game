import { combineReducers } from 'redux';
import authReducer from './authReducer';
import scoreReducer from './scoreReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth : authReducer,
    score : scoreReducer,
    error : errorReducer
});