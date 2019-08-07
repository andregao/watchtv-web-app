const https = require('https');
const { authGuard } = require('./middleware/auth');
const { app, functions, db, sgMail } = require('./utils/config');
const { tmdbKey, omdbKey, getApiConfig, fetchUserData, updateUserData } = require('./handlers/api');
const { countries } = require('./utils/countries');

app.get('/api/config', getApiConfig);
app.get('/api/user', authGuard, fetchUserData);
app.patch('/api/user', authGuard, updateUserData);

// connect express to functions 'api' route
exports.api = functions.https.onRequest(app);

// cloud scheduler to pull configuration every few days
exports.readTmdbConfigs = functions.pubsub.schedule('every 72 hours').onRun(async () => {
  return new Promise(resolve => {
    https.get(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`, res => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        const parsedData = JSON.parse(rawData);
        resolve(parsedData);
      });
    });
  }).then(config => {
    const { images } = config;
    delete images.base_url;
    const myConfig = {};
    Object.keys(images).forEach(key => {
      const newKey = key.replace(/_\w/g, prefix => prefix[1].toUpperCase());
      myConfig[newKey] = images[key];
    });
    myConfig.tmdbKey = tmdbKey;
    myConfig.omdbKey = omdbKey;
    myConfig.countries = countries;
    const p1 = db.doc('watchtv-prod/api-config').set(myConfig);
    const p2 = db.doc('watchtv-dev/api-config').set(myConfig);
    return Promise.all([p1, p2]);
  });
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  const { email, displayName } = user;
  const msg = {
    to: email,
    from: { email: 'hi@andregao.com', name: 'WatchTV Web App' },
    templateId: 'd-3f935e07380a45b4a9b7043af51ac865',
    dynamic_template_data: {
      displayName
    }
  };
  return sgMail.send(msg);
});
