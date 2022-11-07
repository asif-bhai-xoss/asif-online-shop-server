const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    invoice_no: { type: String, required: true, unique: true},
    //current_cart_id: { type: String, required: true, unique: true },
  userName:{ type:String, required: true },
    order_id: { type: String},
    //cart: { type: Array, default:[] },
    orderStatus: { type: String, default: "packaging" }, // shipping, delivered, canceled
    order_date: { type: String },
    products: { type: Array, default:[]},
    productPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total_bill: { type: Number, default: 0 },
    payment_method: { type: String, default: "cod" },
    txId: { type: String, default: "" },
  },
  { timestamps: true }
);

// orderItemSchema.index(
//   {
//     order_id: 1,
//     invoice_no: 1,
//   },
//   {
//     unique: true,
//   }
// );

module.exports = mongoose.model("orderItems", orderItemSchema);

//eventloop, middleware, nodejs lifecycle, upload image, node js scope, js single thread, js multi thread, 