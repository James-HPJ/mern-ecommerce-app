const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    errmsg: "email must be unique",
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  cart: {
    items: [
      {
        _id: { type: String, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    totalQuantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: "Order" }],
});

module.exports = mongoose.model("User", userSchema);
