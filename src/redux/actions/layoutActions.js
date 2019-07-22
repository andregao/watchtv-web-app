export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export const TOGGLE_SIDENAV = 'TOGGLE_SIDENAV';
export const TOGGLE_EPISODE_DETAIL = 'TOGGLE_EPISODE_DETAIL';
export const TOGGLE_TALENT_DETAIL = 'TOGGLE_TALENT_DETAIL';

export const LayoutActions = {
  toggleSearch: () => ({ type: TOGGLE_DIALOG }),
  toggleSidenav: () => ({ type: TOGGLE_SIDENAV }),
  toggleEpisodeDetail: data => ({ type: TOGGLE_EPISODE_DETAIL, payload: data }),
  // toggleTalentDetail: () => ({ type: TOGGLE_TALENT_DETAIL })
};
