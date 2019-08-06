export const TOGGLE_SEARCH = '[LAYOUT] TOGGLE SEARCH';
export const TOGGLE_SIDENAV = '[LAYOUT] TOGGLE SIDENAV';
export const TOGGLE_NOTIFICATION = '[LAYOUT] OPEN NOTIFICATION';
export const TOGGLE_TRACK_WIZARD = '[LAYOUT] TOGGLE TRACK WIZARD';
export const TOGGLE_EPISODE_DETAIL = '[LAYOUT] TOGGLE EPISODE DETAIL';

export const LayoutActions = {
  toggleSearch: () => ({ type: TOGGLE_SEARCH }),
  toggleSidenav: () => ({ type: TOGGLE_SIDENAV }),
  toggleTrackWizard: showId => ({ type: TOGGLE_TRACK_WIZARD, payload: showId }),
  toggleNotification: notificationData => ({ type: TOGGLE_NOTIFICATION, payload: notificationData }),
  /*
  since episode data loads with season data and does NOT require a separate api fetch
  I chose to copy the data inside the store instead of fetching and marking the selected episode
  compares to how selectedShow, selectedSeason, and selectedTalent are implemented
  */
  toggleEpisodeDetail: episodeData => ({ type: TOGGLE_EPISODE_DETAIL, payload: episodeData })
};
