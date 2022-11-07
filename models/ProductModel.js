const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    
    p_name: { type: String, required: true },
    price: { type: Number, default: 100 },
    desc: { type: String, default: "Nice" },
    category: { type: String, default: "mobile" },
    sub_cat: { type: String, default: "samsung" },
    brand: { type: String, default: "samsung" },
    quantity: { type: String, default: 10 },
    isAvailable: { type: Boolean, default: true },
    discount: { type: Number, default: 0 },
    img: { type: String, default: "https://i.ibb.co/nPRQR76/pic3.png"},
    made_in: { type: String, default: "bangladesh" },
    order_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
