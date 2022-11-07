const { getAllUsersCartItems, addToCart, createCart, getOneUserCart, getAllUsersCart, getOneUserCartItems, updateCartItems, removeOneFromCart, removeAllFromCart } = require("../controllers/cart.controller");

const router = require("express").Router();

//create a cart item
router.post("/api/users/:userName/cart/:cid", addToCart);

//get all cart items, vul ase
router.get("/api/users/:userName/cartItems", getAllUsersCartItems);

//create single user cart
router.post("/api/users/:userName/cart", createCart);

//get single user cart
router.get("/api/users/:userName/cart", getOneUserCart);

//get all users cart items
router.get("/api/users/cart/all", getAllUsersCart);

//get single cart item
router.get("/api/users/:userName/cartItems/:pid", getOneUserCartItems);

//update cart
router.patch("/api/users/:userName/cartItems/:pid/:type", updateCartItems);

//remove  from cart
router.delete("/api/users/:userName/cartItems/:pid/:type", removeOneFromCart);

//remove  from cart
router.delete("/api/:userName/cartItems/:cart_id", removeAllFromCart);



module.exports = router;
