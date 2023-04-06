const HttpError = require("../models/httpError");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// ----- SignUp Route -----
const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs, please check your entries in the form",
      422
    );
    return next(error);
  }

  const { username, email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user", 500);
    return next(error);
  }

  const newUser = new User({
    name: username,
    email,
    password: hashedPassword,
    cart: {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    },
    orders: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("could not create new user", 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: newUser.id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again later");
    return next(error);
  }

  res.status(201).json({ userId: newUser.id, isAdmin: newUser.isAdmin, token });
};

// ----- Login Route -----
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Could not establish connection with our server.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, please check your login details again.",
      401
    );
    return next(error);
  }

  let passwordIsValid;

  try {
    passwordIsValid = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not check your credentials, please try again",
      500
    );
  }

  if (!passwordIsValid) {
    const error = new HttpError(
      "Invalid credentials, please check your login details again.",
      401
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Login failed, please try again later");
    return next(error);
  }

  res
    .status(200)
    .json({ userId: existingUser.id, isAdmin: existingUser.isAdmin, token });
};

// ----- Get User Cart -----

const getCartByUserId = async (req, res, next) => {
  const userId = req.userData.userId;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not retrieve cart", 500);
  }

  res.status(200).json({ cart: existingUser.cart });
};

// ----- Cart Changes ------

const newCartChanges = async (req, res, next) => {
  const cart = req.body;
  const userId = req.userData.userId;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not modify cart", 500);
    return next(error);
  }

  existingUser.cart = cart;

  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError("Could not modify cart", 500);
    return next(error);
  }

  res.status(200).json({ message: "Cart successfully modified." });
};

exports.signup = signup;
exports.login = login;
exports.getCartByUserId = getCartByUserId;
exports.newCartChanges = newCartChanges;
