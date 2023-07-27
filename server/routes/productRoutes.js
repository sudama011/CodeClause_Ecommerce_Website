const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");

const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductById);
router.route("/:id").delete(protect, admin, deleteProduct);
router.route("/:id").put(protect, admin, updateProduct);

module.exports = router;
