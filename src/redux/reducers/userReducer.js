import {
  RECEIVE_USER_PROFILE,
  NOT_SIGNED_IN,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  SET_SUBMITTING
} from '../actions/authActions';
import { FETCH_USER_DATA_FAIL, FETCH_USER_DATA_SUCCESS } from '../actions/dbActions';

const initialState = {
  data: null,
  profile: null,
  error: null,
  isSubmitting: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case NOT_SIGNED_IN: {
      return { ...initialState, profile: 'No User', data: null };
    }
    case SET_SUBMITTING: {
      return { ...state, isSubmitting: action.payload };
    }
    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
    case FETCH_USER_DATA_FAIL: {
      return { ...state, error: action.payload };
    }
    case RECEIVE_USER_PROFILE: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
