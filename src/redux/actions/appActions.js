export const SELECT_SHOW = '[APP] SELECT SHOW';
export const SET_SELECTED_SHOW = '[APP] SET SELECTED SHOW';

export const SELECT_SEASON = '[APP] SELECT SEASON';
export const DESELECT_SEASON = '[APP] DESELECT SEASON';
export const SET_SELECTED_SEASON = '[APP] SET SELECTED SEASON';

export const SELECT_TALENT = '[APP] SELECT TALENT';
export const DESELECT_TALENT = '[APP] DESELECT TALENT';
export const SET_SELECTED_TALENT = '[APP] SET SELECTED TALENT';

export const AppActions = {
  // Show detail
  selectShow: id => ({ type: SELECT_SHOW, payload: id }),
  setSelectedShow: id => ({ type: SET_SELECTED_SHOW, payload: id }),
  // Season detail
  selectSeason: (showId, num) => ({ type: SELECT_SEASON, payload: { showId, num } }),
  deselectSeason: showId => ({ type: DESELECT_SEASON, payload: showId }),
  setSelectedSeason: (showId, num) => ({ type: SET_SELECTED_SEASON, payload: { showId, num } }),
  // Talent detail
  selectTalent: id => ({ type: SELECT_TALENT, payload: id }),
  deselectTalent: () => ({ type: DESELECT_TALENT}),
  setSelectedTalent: id => ({ type: SET_SELECTED_TALENT, payload: id }),
}
