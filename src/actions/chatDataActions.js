import axios from 'axios';
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

// Getting chat data
export const getChatData = () => async (dispatch) => {
  try {
    dispatch({ type: CHAT_DATA_REQUEST });

    const { data } = await axios.get('https://api.jsonbin.io/b/5f91b6d13895f90cd22de9c2/latest',
      { headers: { 'secret-key': '$2b$10$PMcEhGZu6Wy0Iq10GukoiO/PdbDTem.GTDbS5gOjlz135P0KFrED2' } });

    dispatch({
      type: CHAT_DATA_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: CHAT_DATA_FAIL,
      payload:
                e.response && e.response.data.message
                  ? e.response.data.message
                  : e.message,
    });
  }
};

// Current chat to show
export const setCurrentChat = (chat) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_CHAT_DATA_REQUEST });
    dispatch({
      type: CURRENT_CHAT_DATA_SUCCESS,
      payload: chat,
    });
  } catch (e) {
    dispatch({
      type: CURRENT_CHAT_DATA_FAIL,
      payload:
                e.response && e.response.data.message
                  ? e.response.data.message
                  : e.message,
    });
  }
};

export const sendNewChatMessage = (updateChat) => async (dispatch) => {
  try {
    dispatch({ type: SEND_NEW_CHAT_DATA_REQUEST });

    const stringifiedChat = JSON.stringify(updateChat);
    const headers = {
      'Content-Type': 'application/json',
      'secret-key': '$2b$10$PMcEhGZu6Wy0Iq10GukoiO/PdbDTem.GTDbS5gOjlz135P0KFrED2',
    };

    await axios.put('https://api.jsonbin.io/b/5f91b6d13895f90cd22de9c2/',
      stringifiedChat,
      { headers })
      .catch((e) => console.log(e));

    dispatch({
      type: SEND_NEW_CHAT_DATA_SUCCESS,
      payload: updateChat,
    });
  } catch (e) {
    dispatch({
      type: SEND_NEW_CHAT_DATA_FAIL,
      payload:
                e.response && e.response.data.message
                  ? e.response.data.message
                  : e.message,
    });
  }
};
