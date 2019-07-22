// const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();
const auth = admin.auth();
const functionsEnvVar = functions.config();
const app = express();

process.env.FUNCTIONS_EMULATOR && app.use(cors({ origin: 'http://localhost:3000' }));
const sessionDuration = 1000 * 60 * 60 * 24 * 14; // two weeks

const dbEnv = process.env.FUNCTIONS_EMULATOR ? 'watchtv-dev' : 'watchtv-prod';

const dbRootCol = db.collection(dbEnv);

module.exports = { functions, auth, functionsEnv: functionsEnvVar, app, dbRootCol, sessionLength: sessionDuration };
