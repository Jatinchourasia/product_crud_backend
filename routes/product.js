const express = require("express");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProduct,
  adminUpdateOneProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/product/add").post(addProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").put(adminUpdateOneProduct);
router.route("/product/:id").get(getProduct);
router.route("/products").get(getAllProducts);
module.exports = router;
