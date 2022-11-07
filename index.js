const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();

//import dbConnection route
const dbConnection = require('./config/dbConnection');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/product.route'));
app.use(require('./routes/user.route'));
app.use(require('./routes/cart.route'));
app.use(require('./routes/order.route'));

//home
app.get("/", (req, res) => {
    res.send("Asif online shop")
})

//client not found error
app.use((req, res, next) => {
    res.json({msg: "Page not found", status: 404});
})

//server not found error
app.use((err, req, res, next) => {
    res.json({msg:err.message, status: 500});
})


dbConnection.dbConnect().then(() => {
    app.listen(port, () => {
        console.log("Server is running on port " + port);
    });
}).catch(err => console.log(err))