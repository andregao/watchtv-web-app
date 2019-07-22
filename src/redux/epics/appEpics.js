import { combineEpics, ofType } from 'redux-observable';
import { map, pluck, tap } from 'rxjs/operators';
import { ApiActions, SELECT_SEASON, SELECT_SHOW, SELECT_TALENT } from '../actions/apiActions';

const selectShowEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(SELECT_SHOW),
    pluck('payload'),
    map(id =>
      haveShow(id, state$.value) ? ApiActions.setSelectedShow(id) : ApiActions.getShowDetail(id)
    )
  );

const selectSeasonEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(SELECT_SEASON),
    // tap(data => console.log(data)),
    pluck('payload'),
    map(({ showId, num }) =>
      haveSeason(showId, num, state$.value)
        ? ApiActions.setSelectedSeason(showId, num)
        : ApiActions.getSeasonDetail(showId, num)
    )
  );

const selectTalentEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(SELECT_TALENT),
    pluck('payload'),
    map(id =>
      haveTalent(id, state$.value)
        ? ApiActions.setSelectedTalent(id)
        : ApiActions.getTalentDetail(id)
    )
  );

// helpers
const haveShow = (showId, state) => !!state.shows[showId];
const haveSeason = (showId, num, state) => !!state.seasons[`${showId}s${num}`];
const haveTalent = (id, state) => !!state.talents[id];

export const appEpics = combineEpics(selectShowEpic, selectSeasonEpic, selectTalentEpic);
