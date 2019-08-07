import { combineEpics, ofType } from 'redux-observable';
import { AuthActions, SAVE_REDIRECT, SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/authActions';
import { catchError, exhaustMap, map, pluck, tap } from 'rxjs/operators';
import { signInWithEmail, signOut, signUpWithEmail, storeSignUpName } from '../../services/auth';

const signInEpic = actions$ =>
  actions$.pipe(
    ofType(SIGN_IN),
    pluck('payload'),
    exhaustMap(credentials =>
      signInWithEmail(credentials).pipe(
        map(() => AuthActions.setSubmitting(false)),
        catchError(err => [AuthActions.signInFail(err.message), AuthActions.setSubmitting(false)])
      )
    )
  );

const signUpEpic = actions$ =>
  actions$.pipe(
    ofType(SIGN_UP),
    pluck('payload'),
    tap(credentials => storeSignUpName(credentials.name)),
    exhaustMap(credentials =>
      signUpWithEmail(credentials).pipe(
        map(() => AuthActions.setSubmitting(false)),
        catchError(err => [AuthActions.signUpFail(err.message), AuthActions.setSubmitting(false)])
      )
    )
  );
const signOutEpic = actions$ =>
  actions$.pipe(
    ofType(SIGN_OUT),
    exhaustMap(() =>
      signOut().pipe(
        map(() => AuthActions.signOutSuccess()),
        catchError(err => [AuthActions.signOutFail(err)])
      )
    )
  );

const saveRedirectEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(SAVE_REDIRECT),
    map(() => AuthActions.saveRedirectSuccess(state$.value.shows.selectedShow))
  );

export const authEpics = combineEpics(signInEpic, signUpEpic, signOutEpic, saveRedirectEpic);
