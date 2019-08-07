import { combineEpics, ofType } from 'redux-observable';
import {
  API_SEARCH,
  ApiActions,
  GET_SEASON_DETAIL,
  GET_SEASON_DETAIL_BATCH,
  GET_SHOW_DETAIL,
  GET_TALENT_DETAIL,
  TRACK_ALL_SHOWS
} from '../actions/apiActions';
import { catchError, concatMap, delay, flatMap, map, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { fetchSeasonDetail, fetchShowDetail, fetchTalentDetail, searchShows } from '../../services/api';
import { AppActions } from '../actions/appActions';

const searchEpic = actions$ =>
  actions$.pipe(
    ofType(API_SEARCH),
    pluck('payload'),
    switchMap(query =>
      searchShows(query).pipe(map(response => ApiActions.searchSuccess(response.results)))
    )
  );

const getShowDetailEpic = actions$ =>
  actions$.pipe(
    ofType(GET_SHOW_DETAIL),
    pluck('payload'),
    switchMap(id =>
      fetchShowDetail(id).pipe(
        flatMap(showData =>
          showData.error
            ? [
              ApiActions.getShowDetailSuccess(showData),
              ApiActions.getShowDetailFail(showData.error),
              AppActions.setSelectedShow(showData.id)
            ]
            : [ApiActions.getShowDetailSuccess(showData), AppActions.setSelectedShow(showData.id)]
        ),
        catchError(() => [
          ApiActions.getShowDetailFail({
            message: 'TMDB API is down, follow @themoviedb for updates',
            variant: 'error',
            link: { external: 'https://twitter.com/themoviedb', text: '@themoviedb' }
          })
        ])
      )
    )
  );

const getSeasonDetailEpic = actions$ =>
  actions$.pipe(
    ofType(GET_SEASON_DETAIL),
    pluck('payload'),
    switchMap(({ showId, num }) =>
      fetchSeasonDetail(showId, num).pipe(
        flatMap(response => [
          ApiActions.getSeasonDetailSuccess(showId, response),
          AppActions.setSelectedSeason(showId, num)
        ]),
        catchError(err => ApiActions.getSeasonDetailFail(err))
      )
    )
  );

const getSeasonDetailBatchEpic = actions$ =>
  actions$.pipe(
    ofType(GET_SEASON_DETAIL_BATCH),
    pluck('payload'),
    concatMap(({ showId, num }) =>
      fetchSeasonDetail(showId, num).pipe(
        map(response => ApiActions.getSeasonDetailSuccess(showId, response)),
        catchError(err => ApiActions.getSeasonDetailFail(err)),
        // TMDB rate limit their api calls hence the delayed concatenated event queue
        delay(400)
      )
    )
  );

const updateTrackShowsEpic = actions$ =>
  actions$.pipe(
    ofType(TRACK_ALL_SHOWS),
    pluck('payload'),
    // map each show season to an get season detail action
    flatMap(shows => {
      const actionsArray = [];
      shows.map(show =>
        show.seasons.map(season =>
          actionsArray.push(ApiActions.getSeasonDetailBatch(show.id, season))
        )
      );
      return actionsArray;
    })
  );

const getTalentDetailEpic = action$ =>
  action$.pipe(
    ofType(GET_TALENT_DETAIL),
    pluck('payload'),
    mergeMap(id => fetchTalentDetail(id)),
    flatMap(response => [
      ApiActions.getTalentDetailSuccess(response),
      AppActions.setSelectedTalent(response.id)
    ])
  );

export const apiEpics = combineEpics(
  searchEpic,
  getShowDetailEpic,
  getSeasonDetailEpic,
  getSeasonDetailBatchEpic,
  updateTrackShowsEpic,
  getTalentDetailEpic
);
