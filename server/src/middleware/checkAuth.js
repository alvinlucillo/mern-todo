const jwt = require("jsonwebtoken");

const HttpError = require("../model/http-error");

const checkAuth = (secret) => async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  req.authenticated = false;

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new Error("Authentication failed");

    const decoded = jwt.verify(token, secret);

    req.user = { id: decoded.userId };

    req.authenticated = true;

    return next();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Authentication failed", 403));
  }
};

module.exports = checkAuth;
