const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    orderlist: {
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
    shippingDetails: {
      address: { type: String, required: true },
      postal: { type: String, required: true },
    },
    paymentDetails: {
      method: { type: String, required: true },
      name: { type: String, required: true },
      cardNumber: { type: String, required: true },
      expiration: { type: String, required: true },
      ccv: { type: String, required: true },
    },
    isFulfilled: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
