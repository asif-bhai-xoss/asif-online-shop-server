const Order = require("../models/OrderModel");
const OrderItem = require("../models/OrderItemModel");
const Users = require("../models/UserModel");
const Cart = require("../models/CartModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const passport = require('passport');
require("../config/passport");


const registration = async (req, res) => {
    const user_w_username = await Users.findOne({userName: req.body.userName});
    const user_w_email = await Users.findOne({email: req.body.email});
    if(user_w_username){
        return res.json({msg:"username already exists", status: 409})
    }
    if(user_w_email){
        return res.json({msg:"email already exists", status: 409})
    }
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash){
        const newUser = new Users({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            confirmedEmail: false
        });
        await newUser.save().then(result => res.json({msg:"Registration successful!!", user: result, status:200})).catch(err => res.json({msg:"Registration not successful!!", status:503}));
    })
}


const login = async (req, res) => {
    const user = await Users.findOne({userName: req.body.userName});
    if(!user){
        return res.json({msg:"user not found", status: 404})
    }
    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
        return res.json({msg:"Invalid username or password", status: 404})
    }
    const payload = {
        uid: user._id,
        userName: user.userName,
        email: user.email,
    };
    let activeToken = jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn:"30d"}
    );
    return res.json({msg:"Login successful!!", user:user, activeToken: `Bearer ${activeToken}`, status: 200})
    
};

const sendActivationEmail = async (req, res)=> {
    const userName = req.params.userName;
    const email = req.body.email;
    const fullName = req.body.fullName;
    const uid = req.body._id;
    const send = require('gmail-send')({
        user: 'asif.shahriar2022@gmail.com',
        pass: process.env.APP_PASS,
        to:   email,
        subject: 'Activate your account',
      });
    
      send({
        html:    `<h3>Hi ${fullName}</h3>
        </br>
        <p>Thanks for joining this eCommerce, you're almost done.</p>
        <p><b>Complete the process by clicking the link below :</b></p>
        </br>
        <p>http://localhost:5000/api/users/${userName}/active/${uid}<a target=_blank href="http://localhost:5000/api/users/${userName}/active/${uid}"/a></p>
        </br>
        <p><b>(If clicking on the link doesn't work, try copying and pasting it into your browser.)</b></p>
        </br>
        <p>Thank you</p>
        `,  
      }, (error, result, fullResult) => {
        if (error) {
            return res.json({msg: "Email did not send, try again", status: 401})
        }
        else{
            return res.json({msg:"Email sent successfully!!",status: 200})
        }
      })
};

const confirmEmail =  (req, res, next) => {
    const uid = req.params.uid;
    const userName = req.params.userName;
     Users.findOne({ _id: uid }, async (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({
          msg: "You are not registered! Please register first",
          status: 405,
        });
      } else if (user) {
        const foundCart = await Cart.findOne({userName: userName})
        const foundOrder = await Order.findOne({userName: userName})
        user.confirmedEmail = true;
        user.cart_id = foundCart._id;
        user.oder_id = foundOrder._id;
        user.save().then(() => res.json({msg: "Registration Completed!", status: 200})).catch(error => res.json({msg: error.message, status: 403}));
      }
    });
  };

//admin
const getAllUsers = async (req, res) => {
    try {
        const result = await Users.find()
        res.send(result)
    } catch (error) {
        res.send(error.message);
    }
  };
  
const getOneUser = async (req, res, next) => {
    const userName = req.params.userName;
    const result = await Users.findOne({ userName: userName });
    if (!result) {
      return res.json({msg: "Error: user not found", status: 404});
    }
    res.send(result);
  };

const updateProfile = async (req, res) => {
    const userName = req.params.userName;
    const filter = {userName: userName};
    const update = {fullName: req.body.fullName, address: req.body.address, phone: req.body.phone};
    await Users.findOneAndUpdate(filter, update, {
        new: true
      }).then(result => res.send(result)).catch(err => res.send(err.message));
  };



module.exports = {
    registration,
    login,
    sendActivationEmail,
    confirmEmail,
    getAllUsers,
    getOneUser,
    updateProfile
};