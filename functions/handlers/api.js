const { functionsEnv, dbRootCol } = require('../utils/config');

exports.omdbKey = functionsEnv.omdb.apikey;
exports.tmdbKey = functionsEnv.tmdb.apikey;

exports.getApiConfig = (req, res) => {
  dbRootCol
    .doc('api-config')
    .get()
    .then(doc => res.json(doc.data()))
    .catch(err => console.error(err));
};

exports.fetchUserData = async (req, res) => {
  const path = `/tracker/users/${req.authUser.uid}`;
  const userDataSnapshot = await dbRootCol.doc(path).get();
  // New User
  if (!userDataSnapshot.exists) {
    const initialData = { fav: {}, track: {} };
    await dbRootCol.doc(path).set(initialData);
    const newUserDataSnapshot = await dbRootCol.doc(path).get();
    return res.status(200).send(newUserDataSnapshot.data());
  }
  // Current User
  return res.status(200).send(userDataSnapshot.data());
};
