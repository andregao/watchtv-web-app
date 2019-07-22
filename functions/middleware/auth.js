const { auth } = require('../utils/config');

exports.authGuard = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    req.authUser = await auth.verifyIdToken(idToken);
    next();
  } catch(e) {
    res.status(403).send('Unauthorized');
  }
};
