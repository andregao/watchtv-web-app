export const API_SEARCH = 'API_SEARCH';
export const API_SEARCH_SUCCESS = 'API_SEARCH_SUCCESS';
export const API_SEARCH_FAIL = 'API_SEARCH_FAIL';

export const SELECT_SHOW = 'SELECT_SHOW';
export const SET_SELECTED_SHOW = 'SET_SELECTED_SHOW';
export const GET_SHOW_DETAIL = 'GET_SHOW_DETAIL';
export const GET_SHOW_DETAIL_SUCCESS = 'GET_SHOW_DETAIL_SUCCESS';
export const GET_SHOW_DETAIL_FAIL = 'GET_SHOW_DETAIL_FAIL';

export const SELECT_SEASON = 'SELECT_SEASON';
export const DESELECT_SEASON = 'DESELECT_SEASON';
export const SET_SELECTED_SEASON = 'SET_SELECTED_SEASON';
export const GET_SEASON_DETAIL = 'GET_SEASON_DETAIL';
export const GET_SEASON_DETAIL_SUCCESS = 'GET_SEASON_DETAIL_SUCCESS';
export const GET_SEASON_DETAIL_FAIL = 'GET_SEASON_DETAIL_FAIL';

export const SELECT_TALENT = 'SELECT_TALENT';
export const DESELECT_TALENT = 'DESELECT_TALENT';
export const SET_SELECTED_TALENT = 'SET_SELECTED_TALENT';
export const GET_TALENT_DETAIL = 'GET_TALENT_DETAIL';
export const GET_TALENT_DETAIL_SUCCESS = 'GET_TALENT_DETAIL_SUCCESS';
export const GET_TALENT_DETAIL_FAIL = 'GET_TALENT_DETAIL_FAIL';

export const ApiActions = {
  search: query => ({ type: API_SEARCH, payload: query }),
  searchSuccess: data => ({ type: API_SEARCH_SUCCESS, payload: data }),
  searchFail: err => ({ type: API_SEARCH_FAIL, payload: err }),
  selectShow: id => ({ type: SELECT_SHOW, payload: id }),

  // Show detail actions
  setSelectedShow: id => ({ type: SET_SELECTED_SHOW, payload: id }),
  getShowDetail: id => ({ type: GET_SHOW_DETAIL, payload: id }),
  getShowDetailSuccess: data => ({ type: GET_SHOW_DETAIL_SUCCESS, payload: data }),
  getShowDetailFail: err => ({ type: GET_SHOW_DETAIL_FAIL, payload: err }),

  // Season detail actions
  selectSeason: (showId, num) => ({ type: SELECT_SEASON, payload: { showId, num } }),
  deselectSeason: showId => ({ type: DESELECT_SEASON, payload: showId }),
  setSelectedSeason: (showId, num) => ({ type: SET_SELECTED_SEASON, payload: { showId, num } }),
  getSeasonDetail: (showId, num) => ({ type: GET_SEASON_DETAIL, payload: { showId, num } }),
  getSeasonDetailSuccess: (showId, data) => ({
    type: GET_SEASON_DETAIL_SUCCESS,
    payload: { showId, data }
  }),
  getSeasonDetailFail: err => ({ type: GET_SEASON_DETAIL_FAIL, payload: err }),

  // Talent detail actions
  selectTalent: id => ({ type: SELECT_TALENT, payload: id }),
  deselectTalent: () => ({ type: DESELECT_TALENT}),
  setSelectedTalent: id => ({ type: SET_SELECTED_TALENT, payload: id }),
  getTalentDetail: id => ({ type: GET_TALENT_DETAIL, payload: id }),
  getTalentDetailSuccess: data => ({ type: GET_TALENT_DETAIL_SUCCESS, payload: data }),
  getTalentDetailFail: err => ({ type: GET_TALENT_DETAIL_FAIL, payload: err }),
};
