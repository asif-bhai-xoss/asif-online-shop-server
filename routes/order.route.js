//import { nanoid } from 'nanoid';
const { createOrderId, getOneUserOrderId, placeOrder, getOneUserAllOrder, getAllOrders, updateOrderStatus } = require("../controllers/order.controller");
const router = require("express").Router();



// create single user order
router.post("/api/users/:userName/order", createOrderId);

//get single user order
router.get("/api/users/:userName/order", getOneUserOrderId);

//new confirm order item placed
router.post("/api/users/:userName/order/:order_id", placeOrder);


//get all order items of specific user
router.get("/api/users/:userName/orderItems/:order_id", getOneUserAllOrder);

//admin
//get all order items of all users
router.get("/api/orderItems", getAllOrders);

//update specific order status
router.patch("/api/orderItems/:invoice_no", updateOrderStatus);

module.exports = router;