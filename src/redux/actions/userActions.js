export const WATCH_EPISODE = '[USER] WATCH EPISODE';
export const FAVORITE_SHOW = '[USER] FAVORITE SHOW';
export const REMOVE_FAVORITE = '[USER] REMOVE FAVORITE';
export const WIZARD_ADD_SEASON = '[WIZARD] ADD SEASON';
export const WIZARD_REMOVE_SEASON = '[WIZARD] REMOVE SEASON';
export const TRACK_SHOW = '[USER] TRACK SHOW';
export const REMOVE_TRACK_SHOW = '[USER] REMOVE TRACK SHOW';
export const SORT_TRACK_SHOWS = '[USER] SORT TRACK SHOWS';
export const SWITCH_THEME = '[USER] SWITCH THEME';
export const SWITCH_THEME_SUCCESS = '[USER] SWITCH THEME SUCCESS';

export const UserActions = {
  watchEpisode: watchData => ({ type: WATCH_EPISODE, payload: watchData }),
  favoriteShow: showData => ({ type: FAVORITE_SHOW, payload: showData }),
  removeFavorite: showId => ({ type: REMOVE_FAVORITE, payload: showId }),
  wizardAddSeason: trackShowData => ({ type: WIZARD_ADD_SEASON, payload: trackShowData }),
  wizardRemoveSeason: seasonNum => ({ type: WIZARD_REMOVE_SEASON, payload: seasonNum }),
  trackShow: wizardData => ({ type: TRACK_SHOW, payload: wizardData }),
  removeTrackShow: showId => ({ type: REMOVE_TRACK_SHOW, payload: showId }),
  sortTrackShows: trackShows => ({ type: SORT_TRACK_SHOWS, payload: trackShows }),
  switchTheme: () => ({ type: SWITCH_THEME }),
  switchThemeSuccess: () => ({ type: SWITCH_THEME_SUCCESS })
};
