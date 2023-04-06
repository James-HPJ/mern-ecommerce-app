const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");
const Product = require("../models/products");

// ----- Get All Products -----
const getAllProducts = async (req, res, next) => {
  const searchQuery = req.query.q;

  const regexPattern = new RegExp(`\\b${searchQuery}\\b`, "gi");

  let products;
  try {
    if (searchQuery) {
      products = await Product.find({ name: regexPattern });
    } else {
      products = await Product.find();
    }
  } catch (err) {
    const error = new HttpError("Could not get products", 500);
    return next(error);
  }
  res.status(200).json({
    products: products.map((p) => p.toObject({ getters: true })),
  });
};

// ----- Get All Products by Category -----
const getProductsByCategory = async (req, res, next) => {
  const selectedCat = req.params.cat;

  let productsByCat;
  try {
    productsByCat = await Product.find({ category: selectedCat });
  } catch (err) {
    const error = new HttpError("Could not find products of category", 500);
    return next(error);
  }

  res.status(200).json({
    productsByCat: productsByCat.map((p) => p.toObject({ getters: true })),
  });
};

// ----- Get Product by ID -----
const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  let productSuggestions;

  try {
    product = await Product.findById(productId);
    productSuggestions = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    });
  } catch (err) {
    const error = new HttpError("Could not get product", 500);
    return next(error);
  }

  res.status(200).json({
    product: product.toObject({ getters: true }),
    productSuggestions: productSuggestions.map((p) =>
      p.toObject({ getters: true })
    ),
  });
};

// ----- Get Products from Search Query -----

const getProductsByQuery = async (req, res, next) => {
  const searchQuery = req.query.q;

  const regexPattern = new RegExp(`\\b${searchQuery}\\b`, "gi");

  let products;
  try {
    products = await Product.find({ name: regexPattern });
  } catch (err) {
    const error = new HttpError("Could not get product", 500);
    return next(error);
  }

  res.status(200).json({
    products: products.map((p) => p.toObject({ getters: true })),
  });
};

// ----- Create a Product -----
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs given", 422);
    return next(error);
  }

  const newProduct = new Product(req.body);

  try {
    await newProduct.save();
  } catch (err) {
    const error = new HttpError("could not create new product", 500);
    return next(error);
  }

  res.status(201).json({ message: `${newProduct.id} is created.` });
};

// ----- Edit a Product -----
const editProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs given", 422);
    return next(error);
  }
  const productId = req.params.pid;
  const { description, price, stock, image } = req.body;

  let existingProduct;

  try {
    existingProduct = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not update product", 500);
    return next(error);
  }

  existingProduct.description = description;
  existingProduct.price = price;
  existingProduct.stock = stock;
  existingProduct.image = image;

  try {
    await existingProduct.save();
  } catch (err) {
    const error = new HttpError("Could not update product", 500);
    return next(error);
  }

  res.status(201).json({ message: "Product updated successfully!" });
};

// ----- Delete a Product -----
const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  try {
    await Product.findByIdAndRemove(productId);
  } catch (err) {
    const error = new HttpError("Could not delete product", 500);
    return next(error);
  }
  res.json({ message: `${productId} is deleted.` });
};

exports.getAllProducts = getAllProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsByQuery = getProductsByQuery;
