const mongoose = require("mongoose");
const HttpError = require("../models/httpError");
const Order = require("../models/orders");
const User = require("../models/user");
const Product = require("../models/products");
const { validationResult } = require("express-validator");

// ----- Get All Orders -----
const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find().sort({ createdAt: -1 });
  } catch (err) {
    const error = new HttpError("Could not find orders", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ orders: orders.map((o) => o.toObject({ getters: true })) });
};

// ----- Get Orders by UserId ------
const getOrdersbyUserId = async (req, res, next) => {
  const userId = req.userData.userId;

  let orders;
  try {
    orders = await Order.find({ customerId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    const error = new HttpError("Could not find orders for current user", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ orders: orders.map((o) => o.toObject({ getters: true })) });
};

// ----- Save an Order -----
const createOrder = async (req, res, next) => {
  const userId = req.userData.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    const error = new HttpError(
      "Invalid order inputs, please check your entry fields",
      422
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not find user", 500);
  }

  const newOrder = new Order({ ...req.body, customerId: userId });

  const products = req.body.orderlist.items;

  const productIds = products.map((p) => p._id);
  const currentProducts = await Product.find({ _id: { $in: productIds } });

  const outOfStockProducts = currentProducts.filter((p) => {
    const requestedQuantity = products.find(
      (rp) => rp._id === p._id.toString()
    ).quantity;
    return p.stock < requestedQuantity;
  });

  if (outOfStockProducts.length > 0) {
    const error = new HttpError(
      `Not enough stock for ${outOfStockProducts
        .map((p) => p.name)
        .join(", ")}`,
      400
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Promise.all(
      products.map(async (p) => {
        await Product.findByIdAndUpdate(p._id, {
          $inc: { stock: -p.quantity },
        });
      })
    );
    await newOrder.save({ session: sess });
    user.orders.push(newOrder);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Unable to create order", 500);
    return next(error);
  }

  res.status(200).json({ message: "We have recieved your order!" });
};

// ----- Changing isFulfilled status of Order -----
const editOrder = async (req, res, next) => {
  const { id, isFulfilled } = req.body;

  let existingOrder;
  try {
    existingOrder = await Order.findById(id);
  } catch (err) {
    const error = new HttpError("Could not find order to edit", 500);
    return next(error);
  }

  existingOrder.isFulfilled = isFulfilled;

  try {
    await existingOrder.save();
  } catch (err) {
    const error = new HttpError("Could not edit order", 500);
    return next(error);
  }

  res.status(200).json({ message: "order is edited." });
};

exports.getAllOrders = getAllOrders;
exports.createOrder = createOrder;
exports.getOrdersbyUserId = getOrdersbyUserId;
exports.editOrder = editOrder;
