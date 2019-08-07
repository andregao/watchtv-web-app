import { API_SEARCH_SUCCESS } from '../actions/apiActions';
import { SIGN_OUT_SUCCESS } from '../actions/authActions';

const initialState = {
  searchResults: null,
  error: null
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case API_SEARCH_SUCCESS: {
      return {
        ...state,
        searchResults: action.payload
      };
    }
    case SIGN_OUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
