import { combineEpics, ofType } from 'redux-observable';
import { DbActions, FETCH_USER_DATA } from '../actions/dbActions';
import { catchError, map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { fetchUserData } from '../../services/db';
import { userToken$ } from '../../services/auth';
import { RECEIVE_USER_PROFILE } from '../actions/authActions';

const receiveUserProfileEpic = actions$ => actions$.pipe(
  ofType(RECEIVE_USER_PROFILE),
  map(() => DbActions.fetchUserData())
);

const fetchUserDataEpic = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER_DATA),
    withLatestFrom(userToken$),
    switchMap(([, token]) => fetchUserData(token).pipe(
      // pluck('response'),
      tap(data => console.log('inside fetchUserData epic', data)),
      map(data => DbActions.fetchUserDataSuccess(data)),
      catchError(err => DbActions.fetchUserDataFail(err))
    ))
  );

export const dbEpics = combineEpics(receiveUserProfileEpic, fetchUserDataEpic);
