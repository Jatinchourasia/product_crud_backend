const express = require("express");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/product/add").post(addProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").put(deleteProduct);
router.route("/products").get(getAllProducts);
module.exports = router;
