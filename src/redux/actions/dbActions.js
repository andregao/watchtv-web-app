export const UPDATE_TRACK_SHOWS = '[DB] UPDATE TRACK SHOWS';
export const UPDATE_TRACK_SHOWS_SUCCESS = '[DB] UPDATE TRACK SHOWS SUCCESS';
export const UPDATE_TRACK_SHOWS_FAIL = '[DB] UPDATE TRACK SHOWS FAIL';
export const UPDATE_FAV_SHOWS_SUCCESS = '[DB] UPDATE FAV SHOWS SUCCESS';
export const UPDATE_FAV_SHOWS_FAIL = '[DB] UPDATE FAV SHOWS FAIL';
export const FETCH_USER_DATA = '[DB] FETCH USER DATA';
export const FETCH_USER_DATA_SUCCESS = '[DB] FETCH USER DATA SUCCESS';
export const FETCH_USER_DATA_FAIL = '[DB] FETCH USER DATA FAIL';

export const DbActions = {
  updateTrackShows: () => ({ type: UPDATE_TRACK_SHOWS }),
  updateTrackShowsSuccess: () => ({ type: UPDATE_TRACK_SHOWS_SUCCESS }),
  updateTrackShowsFail: err => ({ type: UPDATE_TRACK_SHOWS_FAIL, payload: err }),
  updateFavShowsSuccess: () => ({ type: UPDATE_FAV_SHOWS_SUCCESS }),
  updateFavShowsFail: err => ({ type: UPDATE_FAV_SHOWS_FAIL, payload: err }),
  fetchUserData: () => ({ type: FETCH_USER_DATA }),
  fetchUserDataSuccess: data => ({ type: FETCH_USER_DATA_SUCCESS, payload: data }),
  fetchUserDataFail: err => ({ type: FETCH_USER_DATA_FAIL, payload: err })
};
