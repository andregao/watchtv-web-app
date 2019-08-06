import { WIZARD_ADD_SEASON, WIZARD_REMOVE_SEASON } from '../actions/userActions';
import { TOGGLE_TRACK_WIZARD } from '../actions/layoutActions';
import { deepClone } from './userReducer';

const initialState = null;

export default function trackWizardReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TRACK_WIZARD: {
      const id = action.payload;
      return id ? { id, seasons: [] } : initialState;
    }
    case WIZARD_ADD_SEASON: {
      return addSeasonToState(deepClone(state), action.payload);
    }
    case WIZARD_REMOVE_SEASON: {
      return removeSeasonFromState(deepClone(state), action.payload);
    }
    default: {
      return state;
    }
  }
}

// helpers
const addSeasonToState = (state, trackShowData) => {
  if (state.seasons.length !== 0) {
    state.seasons.push(trackShowData.seasonNum);
  } else {
    const { seasonNum, ...rest } = trackShowData;
    state = rest;
    state.seasons = [seasonNum];
  }
  return state;
};

const removeSeasonFromState = (state, seasonNum) => {
  state.seasons = state.seasons.filter(s => s !== seasonNum);
  return state;
};
