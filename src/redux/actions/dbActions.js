export const SAVE_USER_DATA = '[DB] SAVE_USER_DATA';
export const SAVE_USER_DATA_SUCCESS = '[DB] SAVE_USER_DATA_SUCCESS';
export const SAVE_USER_DATA_FAIL = '[DB] SAVE_USER_DATA_FAIL';
export const FETCH_USER_DATA = '[DB] FETCH_USER_DATA';
export const FETCH_USER_DATA_SUCCESS = '[DB] FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAIL = '[DB] FETCH_USER_DATA_FAIL';

export const DbActions = {
  saveUserData: () => ({ type: SAVE_USER_DATA }),
  saveUserDataSuccess: data => ({ type: SAVE_USER_DATA_SUCCESS, payload: data }),
  saveUserDataFail: err => ({ type: SAVE_USER_DATA_FAIL, payload: err }),
  fetchUserData: () => ({ type: FETCH_USER_DATA }),
  fetchUserDataSuccess: data => ({ type: FETCH_USER_DATA_SUCCESS, payload: data }),
  fetchUserDataFail: err => ({ type: FETCH_USER_DATA_FAIL, payload: err })
};
