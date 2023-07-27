const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true, default: "Uncategorized" },
  // reviews: [reviewSchema],
  // rating: { type: Number, required: true, default: 0 },
  // numReviews: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
