const express = require("express");
const ordersController = require("../controllers/orders-controller");
const checkAuth = require("../middleware/check-auth");
const checkIsAdmin = require("../middleware/check-isAdmin");
const { check } = require("express-validator");

const router = express.Router();

const checkOrderInputs = [
  check("orderlist").not().isEmpty(),
  check("shippingDetails.address").not().isEmpty(),
  check("shippingDetails.postal").not().isEmpty(),
  check("paymentDetails.*").not().isEmpty(),
];

router.use(checkAuth);

router.get("/", ordersController.getOrdersbyUserId);

router.post("/", checkOrderInputs, ordersController.createOrder);

router.use(checkIsAdmin);

router.get("/admin", ordersController.getAllOrders);

router.patch("/", ordersController.editOrder); //only for changing isFulfilled status

module.exports = router;
