import {
  TOGGLE_EPISODE_DETAIL,
  TOGGLE_NOTIFICATION,
  TOGGLE_SEARCH,
  TOGGLE_SIDENAV,
  TOGGLE_TRACK_WIZARD
} from '../actions/layoutActions';
import { GET_SHOW_DETAIL_FAIL } from '../actions/apiActions';

const initialState = {
  searchOpen: false,
  sidenavOpen: false,
  notification: false,
  episodeDetailOpen: false,
  episodeDetailItem: null,
  trackWizardShow: null
};

export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SEARCH: {
      return {
        ...state,
        searchOpen: !state.searchOpen
      };
    }
    case TOGGLE_SIDENAV: {
      return {
        ...state,
        sidenavOpen: !state.sidenavOpen
      };
    }
    case TOGGLE_NOTIFICATION:
    case GET_SHOW_DETAIL_FAIL: {
      return {
        ...state,
        notification: action.payload
      };
    }
    case TOGGLE_EPISODE_DETAIL: {
      return {
        ...state,
        episodeDetailOpen: !state.episodeDetailOpen,
        episodeDetail: action.payload
      };
    }
    case TOGGLE_TRACK_WIZARD: {
      return {
        ...state,
        trackWizardShow: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
