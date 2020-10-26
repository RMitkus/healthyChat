import {
  CHAT_DATA_FAIL,
  CHAT_DATA_REQUEST,
  CHAT_DATA_SUCCESS,
  CURRENT_CHAT_DATA_FAIL,
  CURRENT_CHAT_DATA_REQUEST,
  CURRENT_CHAT_DATA_SUCCESS,
  SEND_NEW_CHAT_DATA_FAIL,
  SEND_NEW_CHAT_DATA_REQUEST,
  SEND_NEW_CHAT_DATA_SUCCESS,
} from '../constants/chatConstants';

export const chatDataReducer = (state = { chat: [] }, action) => {
  switch (action.type) {
    case CHAT_DATA_REQUEST:
      return { loading: true, chat: [] };
    case CHAT_DATA_SUCCESS:
      return { loading: false, chat: action.payload };
    case CHAT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const currentChatReducer = (state = { currentChat: 'Veggies' }, action) => {
  switch (action.type) {
    case CURRENT_CHAT_DATA_REQUEST:
      return { loading: true, currentChat: '' };
    case CURRENT_CHAT_DATA_SUCCESS:
      return { loading: false, currentChat: action.payload };
    case CURRENT_CHAT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sendNewChatDataReducer = (state = { from: { type: '' }, msg: { message: '' } }, action) => {
  switch (action.type) {
    case SEND_NEW_CHAT_DATA_REQUEST:
      return { loading: true, newMessage: {} };
    case SEND_NEW_CHAT_DATA_SUCCESS:

      return { loading: false, newMessage: action.payload };
    case SEND_NEW_CHAT_DATA_FAIL:
      return { loading: false, newMessage: action.payload };
    default:
      return state;
  }
};
