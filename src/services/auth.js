import { BehaviorSubject, from, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// development firebase setup
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// end of development setup

// production firebase setup
// const auth = window.firebase.auth();
// end of production setup

const authInit = new Subject();
export const authInit$ = authInit.asObservable();

const user = new ReplaySubject(1);
const unsubUser = new Subject();
export const user$ = user.asObservable().pipe(takeUntil(unsubUser));

const signUpName = new BehaviorSubject('');
export const signUpName$ = signUpName.asObservable();

const userToken = new BehaviorSubject('');
export const userToken$ = userToken.asObservable();

export function initializeAuth() {
  auth.onAuthStateChanged(handleAuthChange);
  authInit.next();
}

function handleAuthChange(authUser) {
  if (!authUser) {
    user.next(null);
  } else {
    const {
      uid,
      providerData: [{ providerId }],
      email,
      displayName
    } = authUser;
    const localUser = { uid, providerId, email, displayName };
    auth.currentUser.getIdToken(true).then(token => {
      userToken.next(token);
      displayName ? user.next(localUser) : user.next({ displayName: null });
    });
  }
}

export function signInWithEmail({ email, password }) {
  return from(auth.signInWithEmailAndPassword(email.trim(), password));
}

export function signUpWithEmail({ email, password }) {
  return from(auth.createUserWithEmailAndPassword(email.trim(), password));
}

export function signOut() {
  return from(auth.signOut());
}

export function storeSignUpName(name) {
  name.trim() && signUpName.next(name);
}

export function saveNameToAuth() {
  signUpName$.pipe(take(1)).subscribe(displayName => {
    if (!displayName) {
      displayName = 'New User';
    }
    auth.currentUser.updateProfile({ displayName }).then(() => handleAuthChange(auth.currentUser));
  });
}

export function stopMonitoringAuth() {
  unsubUser.next();
}
