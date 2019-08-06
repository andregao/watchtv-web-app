const { functionsEnvVar, dbRootCol } = require('../utils/config');

exports.omdbKey = functionsEnvVar.omdb.apikey;
exports.tmdbKey = functionsEnvVar.tmdb.apikey;

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
    const initialData = { fav: [], track: [] };
    await dbRootCol.doc(path).set(initialData);
    const newUserDataSnapshot = await dbRootCol.doc(path).get();
    return res.status(200).send(newUserDataSnapshot.data());
  }
  // Current User
  return res.status(200).send(userDataSnapshot.data());
};

exports.updateUserData = async (req, res) => {
  const path = `/tracker/users/${req.authUser.uid}`;

  try {
    await dbRootCol.doc(path).update(req.body);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Unable to update user data');
  }
  return res.status(200).send('Track Shows Updated');
};
