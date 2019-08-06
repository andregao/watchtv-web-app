import {
  RECEIVE_USER_PROFILE,
  NOT_SIGNED_IN,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  SET_SUBMITTING, SAVE_REDIRECT_SUCCESS
} from '../actions/authActions';
import { FETCH_USER_DATA_FAIL, FETCH_USER_DATA_SUCCESS } from '../actions/dbActions';
import {
  FAVORITE_SHOW,
  REMOVE_FAVORITE,
  REMOVE_TRACK_SHOW,
  SORT_TRACK_SHOWS,
  TRACK_SHOW,
  WATCH_EPISODE
} from '../actions/userActions';

const initialState = {
  profile: null,
  redirect: null,
  error: null,
  isSubmitting: false,
  trackShows: [],
  favShows: []
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NOT_SIGNED_IN: {
      return { ...initialState, profile: 'No User' };
    }
    case SET_SUBMITTING: {
      return { ...state, isSubmitting: payload };
    }
    case SAVE_REDIRECT_SUCCESS: {
      return {
        ...state,
        redirect: payload
      };
    }
    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
    case FETCH_USER_DATA_FAIL: {
      return { ...state, error: payload };
    }
    case RECEIVE_USER_PROFILE: {
      return {
        ...state,
        profile: payload
      };
    }
    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        trackShows: payload.track,
        favShows: payload.fav
      };
    }
    case WATCH_EPISODE: {
      return {
        ...state,
        trackShows: updateTrackShowsOnWatch(deepClone(state.trackShows), payload)
      };
    }
    case FAVORITE_SHOW: {
      return {
        ...state,
        favShows: addFavShowToState(state.favShows, payload)
      };
    }
    case REMOVE_FAVORITE: {
      return {
        ...state,
        favShows: removeShowFromUser(state.favShows, payload)
      };
    }
    case TRACK_SHOW: {
      return {
        ...state,
        trackShows: state.trackShows.concat([payload])
      };
    }
    case REMOVE_TRACK_SHOW: {
      return {
        ...state,
        trackShows: removeShowFromUser(state.trackShows, payload)
      };
    }
    case SORT_TRACK_SHOWS: {
      return {
        ...state,
        trackShows: payload
      };
    }
    default: {
      return state;
    }
  }
}

// helpers
export const deepClone = original => JSON.parse(JSON.stringify(original));

const updateTrackShowsOnWatch = (trackShows, watchData) => {
  const { show, season, episode, watched } = watchData;
  let showIndex = 0;
  const showData = trackShows.find((s, i) => {
    if (s.id === show) {
      showIndex = i;
      return true;
    } else {
      return false;
    }
  });
  !showData[season] && (showData[season] = []);
  if (watched) {
    showData[season].push(+episode);
  } else {
    showData[season] = showData[season].filter(ep => ep !== episode);
  }
  if (!showData.seasons.includes(season)) {
    showData.seasons.push(season);
    showData.seasons.sort((a, b) => b - a); // descending season number
  }
  trackShows[showIndex] = showData;
  return trackShows;
};

const addFavShowToState = (favShows, showData) => {
  const newFavs = favShows.slice();
  newFavs.push(showData);
  return newFavs;
};
const removeShowFromUser = (shows, showId) => shows.filter(show => show.id !== showId);
