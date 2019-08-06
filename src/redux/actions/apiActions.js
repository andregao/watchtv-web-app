export const API_SEARCH = '[API] SEARCH';
export const API_SEARCH_SUCCESS = '[API] SEARCH SUCCESS';
export const API_SEARCH_FAIL = '[API] SEARCH FAIL';

export const GET_SHOW_DETAIL = '[API] GET SHOW DETAIL';
export const GET_SHOW_DETAIL_SUCCESS = '[API] GET SHOW DETAIL SUCCESS';
export const GET_SHOW_DETAIL_FAIL = '[API] GET SHOW DETAIL FAIL';

export const GET_SEASON_DETAIL = '[API] GET SEASON DETAIL';
export const GET_SEASON_DETAIL_BATCH = '[API] GET SEASON DETAIL BATCH';
export const GET_SEASON_DETAIL_SUCCESS = '[API] GET SEASON DETAIL SUCCESS';
export const GET_SEASON_DETAIL_FAIL = '[API] GET SEASON DETAIL FAIL';

export const GET_TALENT_DETAIL = '[API] GET TALENT DETAIL';
export const GET_TALENT_DETAIL_SUCCESS = '[API] GET TALENT DETAIL SUCCESS';
export const GET_TALENT_DETAIL_FAIL = '[API] GET TALENT DETAIL FAIL';

export const TRACK_ALL_SHOWS = '[API] TRACK ALL SHOWS';

export const ApiActions = {
  search: query => ({ type: API_SEARCH, payload: query }),
  searchSuccess: data => ({ type: API_SEARCH_SUCCESS, payload: data }),
  searchFail: err => ({ type: API_SEARCH_FAIL, payload: err }),

  // Show detail
  getShowDetail: id => ({ type: GET_SHOW_DETAIL, payload: id }),
  getShowDetailSuccess: data => ({ type: GET_SHOW_DETAIL_SUCCESS, payload: data }),
  getShowDetailFail: err => ({ type: GET_SHOW_DETAIL_FAIL, payload: err }),

  // Season detail
  getSeasonDetail: (showId, num) => ({ type: GET_SEASON_DETAIL, payload: { showId, num } }),
  getSeasonDetailBatch: (showId, num) => ({ type: GET_SEASON_DETAIL_BATCH, payload: { showId, num } }),
  getSeasonDetailSuccess: (showId, data) => ({
    type: GET_SEASON_DETAIL_SUCCESS,
    payload: { showId, data }
  }),
  getSeasonDetailFail: err => ({ type: GET_SEASON_DETAIL_FAIL, payload: err }),

  // Talent detail
  getTalentDetail: id => ({ type: GET_TALENT_DETAIL, payload: id }),
  getTalentDetailSuccess: data => ({ type: GET_TALENT_DETAIL_SUCCESS, payload: data }),
  getTalentDetailFail: err => ({ type: GET_TALENT_DETAIL_FAIL, payload: err }),

  // Track shows on receiving user data
  trackAllShows: trackShows => ({ type: TRACK_ALL_SHOWS, payload: trackShows })
};
