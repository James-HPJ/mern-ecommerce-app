const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new HttpError(
        "Action not allowed, requires authentication",
        401
      );
      return next(error);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = {
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
    };
    next();
  } catch (err) {
    const error = new HttpError(
      "Action not allowed, requires authentication",
      401
    );
    return next(error);
  }
};
