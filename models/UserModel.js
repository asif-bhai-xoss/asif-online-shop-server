const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName:{ type:String},
  address:{ type:String},
  phone:{ type:String},
  email:{ type:String, required:true},
  role:{ type:String, default:'user', enum:['user', 'admin']},
  cart_id:{ type:String},
  // cart:{ type:Array, default:[]},
  // wishlist:{ type:Array, default:[]},
  order_id:{ type:String},
  userName:{ type:String, required: true },
  password:{ type:String, required:true},
  confirmedEmail:{ type:Boolean, default:false},
  // activeToken:{ type:String},
  // id:{ type:String},
},{timestamps:true});

// inside mongoDB cluster, the collection name is "Users"
module.exports = mongoose.model("users",userSchema);