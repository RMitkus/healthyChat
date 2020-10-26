import {
  CURRENT_USER_SET_FAIL,
  CURRENT_USER_SET_REQUEST,
  CURRENT_USER_SET_SUCCESS, USER_PROFILE_SET_FAIL,
  USER_PROFILE_SET_REQUEST, USER_PROFILE_SET_SUCCESS,
} from '../constants/userConstants';

// Playing cookie
export const setUserData = (user) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_SET_REQUEST });
    const userData = user || localStorage.getItem('chat');
    dispatch({
      type: CURRENT_USER_SET_SUCCESS,
      payload: userData,
    });
  } catch (e) {
    dispatch({
      type: CURRENT_USER_SET_FAIL,
      payload:
                e.response,
    });
  }
};

// user profile edit
export const setUserProfileData = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_SET_REQUEST });

    dispatch({
      type: USER_PROFILE_SET_SUCCESS,
      payload: user,
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_SET_FAIL,
      payload:
          e.response,
    });
  }
};
