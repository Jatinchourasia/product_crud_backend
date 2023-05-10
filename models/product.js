const mongoose = require("mongoose");

/**
 * name
 * price
 * description
 * photos[]
 * category
 * stock
 * createdAt
 */

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide product name"],
    trim: true,
    maxlength: [120, "Product name should not be more than 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "please provide product price"],
    maxlength: [6, "Product price should not be more than 6 digits"],
  },
  description: {
    type: String,
    required: [true, "please provide product description"],
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },

  category: {
    type: String,
    required: [
      true,
      "please select category ONLY from - casual, formal, sportswear & footwear",
    ],
    enum: {
      values: ["casual", "formal", "sportswear", "footwear"],
      message:
        "please select category ONLY from - casual, formal, sportswear & footwear",
    },
  },
  stock: {
    type: Number,
    required: [true, "please add a number in stock"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
