import { FUNCTIONS_BASE_URL } from './api';
import { ajax } from 'rxjs/ajax';

export function fetchUserData(token) {
  return ajax
    .getJSON(`${FUNCTIONS_BASE_URL}/user`, { authorization: `Bearer ${token}` });
}
