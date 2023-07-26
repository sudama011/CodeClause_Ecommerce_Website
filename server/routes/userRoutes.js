const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
// router.route("/profile").put(protect, updateUserProfile);

module.exports = router;
