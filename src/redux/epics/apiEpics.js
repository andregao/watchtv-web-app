import { combineEpics, ofType } from 'redux-observable';
import {
  API_SEARCH,
  ApiActions,
  GET_SEASON_DETAIL,
  GET_SHOW_DETAIL,
  GET_TALENT_DETAIL
} from '../actions/apiActions';
import { flatMap, map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import {
  fetchSeasonDetail,
  fetchShowDetail,
  fetchTalentDetail,
  searchShows
} from '../../services/api';

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
    switchMap(id => fetchShowDetail(id)),
    flatMap(response => [
      ApiActions.getShowDetailSuccess(response),
      ApiActions.setSelectedShow(response.id)
    ])
  );

const getSeasonDetailEpic = actions$ =>
  actions$.pipe(
    ofType(GET_SEASON_DETAIL),
    pluck('payload'),
    mergeMap(({ showId, num }) =>
      fetchSeasonDetail(showId, num).pipe(
        flatMap(response => [
          ApiActions.getSeasonDetailSuccess(showId, response),
          ApiActions.setSelectedSeason(showId, num)
        ])
      )
    )
  );

const getTalentDetailEpic = action$ =>
  action$.pipe(
    ofType(GET_TALENT_DETAIL),
    pluck('payload'),
    mergeMap(id => fetchTalentDetail(id)),
    flatMap(response =>
      [ApiActions.getTalentDetailSuccess(response), ApiActions.setSelectedTalent(response.id)]
    )
  );

export const apiEpics = combineEpics(
  searchEpic,
  getShowDetailEpic,
  getSeasonDetailEpic,
  getTalentDetailEpic
);
