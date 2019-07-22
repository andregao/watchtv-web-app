import { API_SEARCH_SUCCESS } from '../actions/apiActions';

const initialState = {
  searchResults: null,
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case API_SEARCH_SUCCESS:{
      return {
        ...state,
        searchResults: action.payload
      }
    }
    default: {
      return state;
    }
  }
}