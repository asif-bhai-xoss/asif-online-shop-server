const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true},
    num_of_orders: { type: Number, default: 0 },
    total_pay: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);

//eventloop, middleware, nodejs lifecycle, upload image, node js scope, js single thread, js multi thread, 