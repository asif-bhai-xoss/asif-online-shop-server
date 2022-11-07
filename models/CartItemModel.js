const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    cart_id: { type: String, required: true },
    pro_id: { type: String, required: true },
    p_name: { type: String },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    productPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartItemSchema.index(
  {
    cart_id: 1,
    pro_id: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("cartItem", cartItemSchema);
