
const router = require("express").Router();

const passport = require('passport');
const { registration, login, sendActivationEmail, confirmEmail, getAllUsers, getOneUser, updateProfile } = require("../controllers/user.controller");
require("../config/passport");


router.use(passport.initialize());

//register
router.post('/api/users/register', registration);

//login
router.post('/api/users/login', login);

//send email
router.post('/api/users/:userName/send-email', sendActivationEmail)

// confirm email by active token
router.get("/api/users/:userName/active/:uid", confirmEmail);

//admin
// display all users as json api to '/users'
router.get("/api/users", getAllUsers);

//get single user
router.get("/api/users/:userName", getOneUser);

//update an user
router.patch('/api/users/update/:userName', updateProfile);

//update  user cart
// router.patch('/api/users/update/:userName/cart', async (req, res) => {
//     const userName = req.params.userName;
//     const foundCart = await Cart.findOne({userName: userName})
//     const filter = {userName: userName};
//     const update = {cart_id: foundCart};
//     await Users.findOneAndUpdate(filter, update, {
//         new: true
//       }).then(result => res.send(result)).catch(err => res.send(err.message));
//   });







// ei route e bairer keu access korte parbe na
// router.get(
//     "/protected",
//     userAuth,
//     checkRole(["user", "admin"]),
//     async (req, res) => {
//       return res.send("Hello user");
//     }
//   );




module.exports = router;