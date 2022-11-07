const { getAllProducts, getOneProduct, addProduct, updateProduct, removeOneProduct } = require("../controllers/product.controller");
const products = require("../models/ProductModel");
const router = require("express").Router();

//get all products
router.get("/api/products", getAllProducts);
//get a single product
router.get("/api/products/:pid", getOneProduct);
//add a product
router.post('/api/products-save', addProduct);
//update a product
router.patch('/api/products/:pid', updateProduct);
//delete a product
router.delete("/api/products/:pid",  removeOneProduct);


module.exports = router;