const checkRole = roles => (req, res, next) => {
    if(!roles.includes(req.user.role)){
        return res.json({msg: "Unauthorize access"});
    }
    else{
        next();
    }
}

module.exports = {
    checkRole
};