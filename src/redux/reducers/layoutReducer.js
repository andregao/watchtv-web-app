import { TOGGLE_DIALOG, TOGGLE_EPISODE_DETAIL, TOGGLE_SIDENAV, TOGGLE_TALENT_DETAIL } from '../actions/layoutActions';

const initialState = {
  searchOpen: false,
  sidenavOpen: false,
  episodeDetailOpen: false,
  episodeDetailItem: null,
  talentDetailOpen: false,
};

export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DIALOG: {
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
    case TOGGLE_EPISODE_DETAIL: {
      return {
        ...state,
        episodeDetailOpen: !state.episodeDetailOpen,
        episodeDetail: action.payload,
      };
    }
    // case TOGGLE_TALENT_DETAIL: {
    //   return {
    //     ...state,
    //     talentDetailOpen: !state.talentDetailOpen,
    //   };
    // }
    default: {
      return state;
    }

  }
}
