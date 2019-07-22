import { combineEpics } from 'redux-observable';
import { apiEpics } from './apiEpics';
import { appEpics } from './appEpics';
import { authEpics } from './authEpics';
import { dbEpics } from './dbEpics';

export const rootEpic = combineEpics(apiEpics, appEpics, authEpics, dbEpics);
