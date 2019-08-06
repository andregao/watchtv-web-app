import { FUNCTIONS_BASE_URL } from './api';
import { ajax } from 'rxjs/ajax';
import { DbActions } from '../redux/actions/dbActions';

export function fetchUserData(token) {
  return ajax.getJSON(`${FUNCTIONS_BASE_URL}/user`, { authorization: `Bearer ${token}` });
}

export function updateTrackShows(trackShows, token) {
  return ajax.patch(
    `${FUNCTIONS_BASE_URL}/user`,
    { track: trackShows },
    { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  );
}

export function updateFavShow(showData, token) {
  return ajax.patch(
    `${FUNCTIONS_BASE_URL}/user`,
    { fav: showData },
    { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  );
}
