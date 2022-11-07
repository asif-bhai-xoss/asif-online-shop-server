//npm i bcrypt jsonwebtoken nodemailer gmail-send
const Users = require("./models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//user register, send mail, handle errors, complete registration
const userRegister = async (userDetails, role, res) => {
    //console.log(userDetails, role);
    const password = await bcrypt.hash(userDetails.password, 10);
    let activeToken = jwt.sign(
        {
            email: userDetails.email
        },process.env.SECRET_KEY,{
            expiresIn:"30d"
        }
    );
    const send = require('gmail-send')({
        user: 'asif.shahriar2022@gmail.com',
        pass: process.env.APP_PASS,
        to:   userDetails.email,
        subject: 'Activate your account',
      });
    
      send({
        html:    `<h3>Hi ${userDetails.fullName}</h3>
        </br>
        <p>Thanks for joining this eCommerce, you're almost done.</p>
        <p><b>Complete the process by clicking the link below :</b></p>
        </br>
        <p>http://localhost:5000/users/${userDetails.userName}/active/${activeToken}<a target=_blank href="http://localhost:5000/users/${userDetails.userName}/active/${activeToken}"/a></p>
        </br>
        <p><b>(If clicking on the link doesn't work, try copying and pasting it into your browser.)</b></p>
        </br>
        <p>Thank you</p>
        `,  
      }, (error, result, fullResult) => {
        if (error) {
            return res.json({msg: "Email did not send", status: 401})
        }
        else{
            const newUser = new Users({
                ...userDetails, password, role, activeToken
            });
            newUser.save().then((data) => {
                console.log("Email has been sent!!");
                if(data.activeToken){
                    return res.json({msg: "Registration successful!! Please confirm email to complete registration", status: 200});
                }
                else{
                    return res.json({msg: "Error: Registration is not successful, try again", status: 501});
                }
            }).catch((error) => {
                throw error;
                return res.json({msg: error.message});
                
            })
        }
      })
    
}

//user login, handle errors, complete login
const userLogin = async (userDetails, role, res) => {
    const {userName, password} = userDetails;
    const foundUser = await Users.findOne({userName: userName});
    if(!foundUser) {
        
        return res.json({msg: "Error: User not found!", status: 404});
    }
    if(foundUser?.role !== role){
        return res.json({msg: "Error: Please log in using right platform", status: 403});
    }
    
    let isMatch = await bcrypt.compare(password, foundUser.password);
    if(!isMatch){
        return res.json({msg: "Invalid username/password", status: 401});
    }
    if(foundUser && foundUser.confirmedEmail === false){
        return res.json({msg: "You did not confirm your email", status: 402});
    }

    //if email and pass both correct then user log in
    let token = jwt.sign(
        { user_id: foundUser._id,
        userName: foundUser.userName,
        role: foundUser.role,
        email: foundUser.email,
        }, process.env.SECRET_KEY,{}
    );
    let result = {
        userName: foundUser.userName,
        role: foundUser.role,
        token: `Bearer ${token}`,
        email: foundUser.email,
    };

    return res.json({
        ...result, 
        msg: "Login successful!!",
        status: 200
    });
    
    
}

//user ta ei website er real user ki na
const userAuth = (req, res, next) => {
    if(!req.header('auth')){
        return res.json({msg: "Failed to authenticate"}); 
    }

    const myToken = req.header('auth')?.split(' ')[1];
    if(myToken){
        return jwt.verify(myToken, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.json({msg: "Failed to authenticate"});
            }
            req.user = decoded;
            return next();
        })
    }
}

// je keu baire theke ei link e access korte parbe na, only user r admin ra parbe
const checkRole = roles => (req, res, next) => {
    if(!roles.includes(req.user.role)){
        return res.json({msg: "Unauthorize access"});
    }
    else{
        next();
    }
}

module.exports = {
    userRegister,
    userLogin,
    userAuth,
    checkRole
};