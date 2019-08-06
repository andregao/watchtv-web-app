import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import apiReducer from './apiReducer';
import showReducer from './showReducer';
import seasonReducer from './seasonReducer';
import talentReducer from './talentReducer';
import userReducer from './userReducer';
import trackWizardReducer from './trackWizardReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  api: apiReducer,
  shows: showReducer,
  seasons: seasonReducer,
  talents: talentReducer,
  trackWizard: trackWizardReducer,
});
