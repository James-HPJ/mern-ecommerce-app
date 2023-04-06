require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const HttpError = require("./models/httpError");

// ----- For Product Initialization -----
// const Product = require("./models/products");
// const productData = require("./models/product-data");

const productsRouter = require("./routes/products-routes");
const userRouter = require("./routes/user-routes");
const orderRouter = require("./routes/orders-routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.use((res, req, next) => {
  const error = new HttpError("Could not find route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error has occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bnaxbue.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("app is up and running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//----- Initialize Products -----
// Product.create(productData);
