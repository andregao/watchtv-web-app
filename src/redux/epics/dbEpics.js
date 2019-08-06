import { combineEpics, ofType } from 'redux-observable';
import { catchError, debounceTime, flatMap, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { updateFavShow, fetchUserData, updateTrackShows } from '../../services/db';
import { userToken$ } from '../../services/auth';
import { DbActions, FETCH_USER_DATA, UPDATE_TRACK_SHOWS } from '../actions/dbActions';
import { RECEIVE_USER_PROFILE } from '../actions/authActions';
import {
  FAVORITE_SHOW,
  REMOVE_FAVORITE,
  REMOVE_TRACK_SHOW,
  TRACK_SHOW,
  WATCH_EPISODE
} from '../actions/userActions';
import { ApiActions } from '../actions/apiActions';

const receiveUserProfileEpic = actions$ =>
  actions$.pipe(
    ofType(RECEIVE_USER_PROFILE),
    map(() => DbActions.fetchUserData())
  );

const fetchUserDataEpic = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER_DATA),
    withLatestFrom(userToken$),
    switchMap(([, token]) =>
      fetchUserData(token).pipe(
        flatMap(data => {
          return data.track && data.track.length > 0
            ? [DbActions.fetchUserDataSuccess(data), ApiActions.trackAllShows(data.track)]
            : [DbActions.fetchUserDataSuccess(data)];
        }),
        catchError(err => [DbActions.fetchUserDataFail(err)])
      )
    )
  );

const watchEpisodeEpic = actions$ =>
  actions$.pipe(
    ofType(WATCH_EPISODE),
    debounceTime(2000),
    map(() => DbActions.updateTrackShows())
  );

const trackShowEpic = actions$ =>
  actions$.pipe(
    ofType(TRACK_SHOW, REMOVE_TRACK_SHOW),
    map(() => DbActions.updateTrackShows())
  );

const updateTrackShowsEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(UPDATE_TRACK_SHOWS),
    withLatestFrom(userToken$),
    switchMap(([, token]) =>
      updateTrackShows(state$.value.user.trackShows, token).pipe(
        map(() => DbActions.updateTrackShowsSuccess()),
        catchError(err => [DbActions.updateTrackShowsFail(err)])
      )
    )
  );

const favShowEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(FAVORITE_SHOW, REMOVE_FAVORITE),
    // debounceTime(1000),
    withLatestFrom(userToken$),
    switchMap(([, token]) =>
      updateFavShow(state$.value.user.favShows, token).pipe(
        map(() => DbActions.updateFavShowsSuccess()),
        catchError(err => [DbActions.updateFavShowsFail(err)])
      )
    )
  );

export const dbEpics = combineEpics(
  receiveUserProfileEpic,
  fetchUserDataEpic,
  watchEpisodeEpic,
  trackShowEpic,
  updateTrackShowsEpic,
  favShowEpic
);
