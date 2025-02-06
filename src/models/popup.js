const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const popupSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Popup", popupSchema);
