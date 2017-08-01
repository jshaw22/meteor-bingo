import { combineReducers } from 'redux';
import authentication from './authentication';
import matchUserReducer from './matchUserReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  authentication,
  matchUserReducer,
  messagesReducer
});

export default rootReducer;