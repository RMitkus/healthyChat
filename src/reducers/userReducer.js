import {
  CURRENT_USER_SET_FAIL,
  CURRENT_USER_SET_REQUEST,
  CURRENT_USER_SET_SUCCESS, USER_PROFILE_SET_FAIL,
  USER_PROFILE_SET_REQUEST,
  USER_PROFILE_SET_SUCCESS,
} from '../constants/userConstants';

export const userDataReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case CURRENT_USER_SET_REQUEST:
      return { loading: true, user: [] };
    case CURRENT_USER_SET_SUCCESS:
      return { loading: false, user: action.payload };
    case CURRENT_USER_SET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_PROFILE_SET_REQUEST:
      return { loading: true, user: [] };
    case USER_PROFILE_SET_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PROFILE_SET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
