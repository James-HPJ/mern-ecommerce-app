const express = require("express");

const checkAuth = require("../middleware/check-auth");
const checkIsAdmin = require("../middleware/check-isAdmin");

const router = express.Router();

const { check } = require("express-validator");

const productsController = require("../controllers/products-controller");

router.get("/", productsController.getAllProducts);

router.get("/:cat", productsController.getProductsByCategory);

router.get("/search", productsController.getProductsByQuery);

router.get("/product/:pid", productsController.getProductById);

router.use(checkAuth, checkIsAdmin);

router.post(
  "/",
  [
    check("name").trim().not().isEmpty(),
    check("description").trim().not().isEmpty(),
    check("category").not().isEmpty(),
    check("price").not().isEmpty(),
    check("stock").not().isEmpty(),
    check("image").trim().not().isEmpty().isURL(),
  ],
  productsController.createProduct
);

router.patch(
  "/product/:pid",
  [
    check("description").trim().not().isEmpty(),
    check("price").not().isEmpty(),
    check("stock").not().isEmpty(),
    check("image").trim().not().isEmpty().isURL(),
  ],
  productsController.editProduct
);

router.delete("/product/:pid", productsController.deleteProduct);

module.exports = router;
