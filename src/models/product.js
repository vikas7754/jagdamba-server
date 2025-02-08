const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    karat: {
      type: Number,
      required: true,
    },
    metal: {
      type: String,
      enum: ["gold", "silver"],
      default: "gold",
    },
    premium: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
