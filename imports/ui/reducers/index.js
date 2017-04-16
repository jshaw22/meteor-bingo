import { combineReducers } from 'redux';
import authentication from './authentication';
import matchUserReducer from './matchUserReducer';

const rootReducer = combineReducers({
  authentication,
  matchUserReducer
});

export default rootReducer;