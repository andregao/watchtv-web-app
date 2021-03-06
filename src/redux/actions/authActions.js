export const NOT_SIGNED_IN = '[AUTH] NOT SIGNED IN';
export const RECEIVE_USER_PROFILE = '[AUTH] RECEIVE USER PROFILE';
export const SIGN_IN = '[AUTH] SIGN IN';
export const SIGN_IN_SUCCESS = '[AUTH] SIGN IN SUCCESS';
export const SIGN_IN_FAIL = '[AUTH] SIGN IN FAIL';
export const SIGN_UP = '[AUTH] SIGN UP';
export const SIGN_UP_SUCCESS = '[AUTH] SIGN UP SUCCESS';
export const SIGN_UP_FAIL = '[AUTH] SIGN UP FAIL';
export const SET_SUBMITTING = '[AUTH] SET SUBMITTING';
export const SIGN_OUT = '[AUTH] SIGN OUT';
export const SIGN_OUT_SUCCESS = '[AUTH] SIGN OUT SUCCESS';
export const SIGN_OUT_FAIL = '[AUTH] SIGN OUT FAIL';
export const SAVE_REDIRECT = '[AUTH] SAVE REDIRECT';
export const SAVE_REDIRECT_SUCCESS = '[AUTH] SAVE REDIRECT SUCCESS';

export const AuthActions = {
  notSignedIn: () => ({ type: NOT_SIGNED_IN }),
  receiveUserProfile: user => ({ type: RECEIVE_USER_PROFILE, payload: user }),
  signIn: credentials => ({ type: SIGN_IN, payload: credentials }),
  signInSuccess: userData => ({ type: SIGN_IN_SUCCESS, payload: userData }),
  signInFail: err => ({ type: SIGN_IN_FAIL, payload: err }),
  signUp: credentials => ({ type: SIGN_UP, payload: credentials }),
  signUpSuccess: userData => ({ type: SIGN_UP_SUCCESS, payload: userData }),
  signUpFail: err => ({ type: SIGN_UP_FAIL, payload: err }),
  setSubmitting: isSubmitting => ({ type: SET_SUBMITTING, payload: isSubmitting }),
  signOut: () => ({ type: SIGN_OUT }),
  signOutSuccess: () => ({ type: SIGN_OUT_SUCCESS }),
  signOutFail: err => ({ type: SIGN_OUT_FAIL, payload: err }),
  saveRedirect: () => ({ type: SAVE_REDIRECT }),
  saveRedirectSuccess: showId => ({ type: SAVE_REDIRECT_SUCCESS, payload: showId })
};
