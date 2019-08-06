import {
  DESELECT_SEASON,
  SET_SELECTED_SEASON,
  SET_SELECTED_SHOW
} from '../actions/appActions';
import { GET_SHOW_DETAIL_SUCCESS } from '../actions/apiActions';

const initialState = {
  selectedShow: null
};

export default function showReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOW_DETAIL_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    }
    case SET_SELECTED_SHOW: {
      return {
        ...state,
        selectedShow: action.payload
      };
    }
    case SET_SELECTED_SEASON: {
      const { showId, num } = action.payload;
      return {
        ...state,
        [showId]: { ...state[showId], selectedSeason: num }
      };
    }
    case DESELECT_SEASON: {
      const showId = action.payload;
      return {
        ...state,
        [showId]: { ...state[showId], selectedSeason: null }
      };
    }
    default: {
      return state;
    }
  }
};
