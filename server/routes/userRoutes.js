const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  addCartItem,
  removeCartItem,
  clearCart,
  getUserCart,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// user routes  (all routes are prepended with /api/user)
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/").get(protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    pic: req.user.pic,
    cart: req.user.cart,
    isAdmin: req.user.isAdmin,
    token: generateToken(req.user._id),
  });
});

// cart routes (all routes are prepended with /api/user/cart)
router.route("/cart/add").put(protect, addCartItem);
router.route("/cart/remove").put(protect, removeCartItem);
router.route("/cart/clear").put(protect, clearCart);
router.route("/cart").get(protect, getUserCart);

module.exports = router;
