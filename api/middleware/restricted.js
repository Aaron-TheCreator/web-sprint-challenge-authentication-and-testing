const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          next({
            code: 401,
            meaage: 'invalid or missing credentials'
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      next({
        code: 401,
        message: 'invalid or missing credentials'
      });
    }
  } catch (err) {
    next({
      code: 500,
      message: 'error validating credentials',
      ...err
    });
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
