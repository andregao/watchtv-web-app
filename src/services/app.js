import { apiInit$, initializeApi } from './api';
import { forkJoin, Subject } from 'rxjs';
import { authInit$, initializeAuth } from './auth';
import { take, takeUntil } from 'rxjs/operators';

const appInit = new Subject();
export const appInit$ = appInit.asObservable().pipe(take(1));

export function initializeApp() {
  forkJoin({
    api: apiInit$.pipe(take(1)),
    auth: authInit$.pipe(take(1))
  }).subscribe(() => {
    appInit.next();
  });
  initializeApi();
  initializeAuth();
}

const navigate = new Subject();
export const navigate$ = navigate.asObservable();

export function navigateTo(path) {
  navigate.next(path);
}
