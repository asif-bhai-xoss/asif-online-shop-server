const mongoose = require("mongoose");
//npm install express-validator
const { body, check, validationResult } = require("express-validator");
const Users = require("../models/UserModel");
const router = require("express").Router();
const { userRegister, userLogin, userAuth, checkRole } = require("../auth");
//const router = express();

let flag = 0;
// check username, email and pass. Then register the user
router.post(
  "/register",
  [
    check("email").custom((value) => {
      return Users.findOne({ email: value }).then((user) => {
        if (user?.email === value) {
          flag = 1;
          //return res.status(403).json({ msg: 'username/email already in use'});
        } else {
          flag = 0;
        }
      });
    }),
    check("userName").custom((value) => {
      return Users.findOne({ userName: value }).then((user) => {
        if (user?.userName === value) {
          flag = 1;
          //return res.status(403).json({ msg: 'username/email already in use'});
        } else {
          flag = 0;
        }
      });
    }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //console.log(errors);
    if (!errors.isEmpty()) {
      return res.json({ msg: errors.array() });
    }
    if (flag === 1) {
      return res.json({ msg: "username/email already in use", status: 409 });
    } else {
      flag = 0;
      await userRegister(req.body, "user", res);
    }
    //res.send("I got your data");
  }
);

// display all users as json api to '/users'
router.get("api/users", (req, res) => {
  Users.find()
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
    });
});

// confirm email by active token
router.get("/api/users/:userName/active/:activeToken", (req, res, next) => {
  const activeToken = req.params.activeToken;
  const userName = req.params.userName;
  Users.findOne({ activeToken: activeToken }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        msg: "You are not registered! Please register first",
        status: 405,
      });
    } else if (user) {
      user.confirmedEmail = true;
      user.save().then(() => res.send("Registration Completed!"));
    }
  });
});

//login the user
router.post("/login", async (req, res) => {
  await userLogin(req.body, "user", res);
});


//get single user
router.get("api/users/:userName", async (req, res, next) => {
  const userName = req.params.userName;
  const result = await Users.findOne({ userName: userName });
  if (!result) {
    res.send("Error: product not found");
    return;
  }
  res.send(result);
});

//update an user
router.patch('/api/users/update/:userName', async (req, res) => {
  const userName = req.params.userName;
  const filter = {userName: userName};
  const update = {fullName: req.body.fullName, address: req.body.address, phone: req.body.phone};
  await Users.findOneAndUpdate(filter, update, {
      new: true
    }).then(result => res.send(result)).catch(err => res.send(err.message));
})

// ei route e bairer keu access korte parbe na
router.get(
  "/protected",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    return res.send("Hello user");
  }
);


router.post("/admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

module.exports = router;
