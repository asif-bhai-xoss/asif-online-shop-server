const products = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    res.send(allProducts);
  } catch (error) {
    res.send(error.message);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const pid = req.params.pid;

    const result = await products.findById({ _id: pid });
    res.send(result);
  } catch (error) {
    res.send("Error: product not found");
  }
};

const addProduct = async (req, res) => {
  try {
    const product = new products(req.body);
    const result = await product.save();
    res.json({ msg: "Product created successfully" });
  } catch (error) {
    res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const filter = { _id: pid };
    const update = { $set: req.body };
    const result = await products.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};


const removeOneProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await products.deleteOne({ _id: pid })
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  removeOneProduct,
};
