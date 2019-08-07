// const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const express = require('express');
const cors = require('cors');

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();
const auth = admin.auth();
const functionsEnvVar = functions.config();
const app = express();

process.env.FUNCTIONS_EMULATOR && app.use(cors({ origin: 'http://localhost:3000' }));

const dbEnv = process.env.FUNCTIONS_EMULATOR ? 'watchtv-dev' : 'watchtv-prod';
const dbRootCol = db.collection(dbEnv);

sgMail.setApiKey(functionsEnvVar.sendgrid.apikey);

module.exports = { functions, auth, functionsEnvVar, app, dbRootCol, db, sgMail };
