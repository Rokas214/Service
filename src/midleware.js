const jwt = require('jsonwebtoken');
const { jwt_secret } = require('./config');
module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      const userDetails = jwt.verify(
        req.headers.authorization.split(' ')[1],
        jwt_secret,
      );
      req.headers.userDetails = userDetails;
      return next();
    } catch (err) {
      return res.status(401).send({ err: 'Incorect details' });
    }
  },
};
