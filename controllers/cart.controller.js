const Cart = require("../models/CartModel");
const CartItem = require("../models/CartItemModel");
const products = require("../models/ProductModel");

//vul ase
const getAllUsersCartItems = async (req, res) => {
  try {
    const result = await CartItem.find()
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const userName = req.params.userName;
  const pro_id = req.body.pro_id;

  const foundItem = await CartItem.findOne({ pro_id: pro_id });

  if (foundItem) {
    return res.json({ msg: "Product already in cart!!", status: 409 });
  }
  const newItem = new CartItem(req.body);
  const result = await newItem.save()
  res.json({ msg: "CartItem created successfully", cid: result._id });
  } catch (error) {
    res.send(error.message);
  }
};

const createCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userName: req.params.userName })
  if(foundCart){
    return res.json({ msg: "Cart already existed!!", status: 409 });
  }
  const newCart = new Cart(req.body);
  const result = await newCart.save();
    res.json({ msg: "Cart created successfully", cid: result._id });
  } catch (error) {
    res.send(error.message);
  }
};

const getOneUserCart = async (req, res) => {
  try {
    const result = await Cart.findOne({ userName: req.params.userName })
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};


const getAllUsersCart = async (req, res) => {
  try {
    const result = await Cart.find()
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};

const getOneUserCartItems = async (req, res) => {
  try {
    const pid = req.params.pid;
  const userName = req.params.userName;
    const result = await CartItem.findOne({ pro_id: pid })
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};


const updateCartItems = async (req, res) => {
  try {
    const userName = req.params.userName;
  const pid = req.body.pid;
  const price = req.body.price;
  const type = req.params.type;
  const foundItem = await CartItem.findOne({ pro_id: pid });
  if (!foundItem) {
    return res.json({ msg: "Cart not found", status: 409 });
  }
  let newQuantity;
  let newProductPrice;
  let msg;
  if (type === "add") {
    newQuantity = foundItem.quantity + 1;
    newProductPrice = foundItem.price + foundItem.productPrice;
    msg = "Product increased";
  } else if (type === "sub") {
    newQuantity = foundItem.quantity - 1;
    newProductPrice = foundItem.productPrice - foundItem.price;
    msg = "Product decreased";
  }
  const filterCartItem = { pro_id: pid };
  const updateCartItem = {
    quantity: newQuantity,
    productPrice: newProductPrice,
  };
    const result = await CartItem.findOneAndUpdate(filterCartItem, updateCartItem, {
        new: true,
      })
      res.json({ msg: msg, cid: result._id });
  } catch (error) {
    res.json({ msg: error.message, status: 503 })
  }
};


const removeOneFromCart = async (req, res) => {
  try {
    const result = await CartItem.deleteOne({ pro_id: req.params.pid })
    res.json({ msg: "Product removed!!", user: result, status: 200 })
  } catch (error) {
    res.send(error.message);
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const result = await CartItem.deleteMany({ cart_id: req.params.cart_id })
    res.json({ msg: "All Product removed!!", user: result, status: 200 })
  } catch (error) {
    res.json({ msg: err.message, status: 503 });
  }
};

module.exports = {
    getAllUsersCartItems,
  addToCart,
  createCart,
  getOneUserCart,
  getAllUsersCart,
  getOneUserCartItems,
  updateCartItems,
  removeOneFromCart,
  removeAllFromCart
};
