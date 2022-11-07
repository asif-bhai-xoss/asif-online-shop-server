const Order = require("../models/OrderModel");
const OrderItem = require("../models/OrderItemModel");

const createOrderId = async (req, res) => {
    try {
        const foundOrder = await Order.findOne({ userName: req.params.userName })
        if(foundOrder){
          return res.json({ msg: "Order already existed!!", status: 409 });
        }
        const newOrder = new Order(req.body);
        const result = await newOrder.save();
        res.json({ msg: "Order created successfully", oid: result._id });
    } catch (error) {
        res.send(error.message);
    }
  };


const getOneUserOrderId = async (req, res) => {
    try {
        const result = await Order.findOne({ userName: req.params.userName })
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
  };

const placeOrder = async (req, res) => {
    try {
    const newItem = new OrderItem(req.body);
        const result = await newItem.save();
        res.json({ msg: "Order is placed successfully", invoice_no: result.invoice_no })
    } catch (error) {
        res.send(error.message);
    }
  };

const getOneUserAllOrder = async (req, res) => {
    try {
        const result = await OrderItem.find({userName: req.params.userName})
        console.log(result);
        res.send(result)
    } catch (error) {
        console.log(result);
        res.send(error.message);
    }
  };

//admin
const getAllOrders = async (req, res) => {
    try {
        const result = await OrderItem.find()
        res.send(result)
    } catch (error) {
        res.send(error.message);
    }
  };

const updateOrderStatus = async (req, res) => {
    try {
        const filter = {invoice_no: req.params.invoice_no}
  const update = {orderStatus: req.body.orderStatus}
        const result = await OrderItem.findOneAndUpdate(filter, update, {
            new: true
          })
          res.json({ msg: "Order status updated successfully", status: 200 })
    } catch (error) {
        res.send(error.message);
    }
  };



module.exports = {
    createOrderId,
    getOneUserOrderId,
    placeOrder,
    getOneUserAllOrder,
    getAllOrders,
    updateOrderStatus
};