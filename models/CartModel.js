const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true},
    //cart: { type: Array, default:[] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);

//eventloop, middleware, nodejs lifecycle, upload image, node js scope, js single thread, js multi thread, 