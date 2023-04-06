const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {
  try {
    const isAdmin = req.userData.isAdmin;

    if (!isAdmin) {
      const error = new HttpError(
        "Action not allowed, requires admin rights",
        401
      );
      return next(error);
    }

    next();
  } catch (err) {
    const error = new HttpError(
      "Action not allowed, requires admin rights",
      401
    );
    return next(error);
  }
};
