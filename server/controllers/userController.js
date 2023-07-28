const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please fill all the fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      cart: user.cart,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      cart: user.cart,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.pic = req.body.pic || user.pic;
  user.password = req.body.password || user.password;
  user.isAdmin = req.body.isAdmin || user.isAdmin;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    pic: updatedUser.pic,
    cart: updatedUser.cart,
    isAdmin: user.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

const addCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const { product, quantity } = req.body;
  const itemExists = user.cart.find((item) => item.product == product);
  if (itemExists) {
    itemExists.quantity += quantity;
  } else {
    user.cart.push({ product, quantity });
  }
  await user.save();
  res.json(user.cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const { product } = req.body;
  user.cart = user.cart.filter((item) => item.product != product);
  await user.save();
  res.json(user.cart);
});

const clearCart = asyncHandler(async (req, res) => {
  const user = req.user;
  user.cart = [];
  await user.save();
  res.json(user.cart);
});

const getUserCart = asyncHandler(async (req, res) => {
  const user = req.user;
  await user.populate("cart.product");
  res.json(user.cart);
});

module.exports = { registerUser, authUser, updateUserProfile, addCartItem, removeCartItem, clearCart, getUserCart };
