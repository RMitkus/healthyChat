import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { chatDataReducer, currentChatReducer, sendNewChatDataReducer } from './reducers/chatReducers';

import { userDataReducer, userProfileReducer } from './reducers/userReducer';

const reducer = combineReducers({
  chatDetails: chatDataReducer,
  userData: userDataReducer,
  currentChat: currentChatReducer,
  newMessage: sendNewChatDataReducer,
  userProfile: userProfileReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
