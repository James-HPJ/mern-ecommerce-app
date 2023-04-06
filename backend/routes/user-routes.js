const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/user-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/login", userController.login);

router.post(
  "/signup",
  [
    check("username").notEmpty(),
    check("password").isLength({ min: 6 }),
    check("email").normalizeEmail().isEmail(),
  ],
  userController.signup
);

router.use(checkAuth);

router.get("/cart", userController.getCartByUserId);

router.put("/cart", userController.newCartChanges);

module.exports = router;
