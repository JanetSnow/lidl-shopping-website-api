const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:hash
        });
        try{
            const savedUser = newUser.save();
        }catch(err){
            console.log(err);
        }

    });
});

//LOGIN
router.post("/login", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
  
    try{
        const foundUser = await User.findOne({email: email});
        //compare(data, encrypted, cb)
        bcrypt.compare(password, foundUser.password, function(err, result) {
            if (result === true) {
                console.log("login successful!");
                const accessToken = jwt.sign({
                    id: foundUser._id,
                    isAdmin: foundUser.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
                );

                const {password, ...others} = foundUser._doc;
                res.status(200).json({...others, accessToken});
            } else {
                console.log("wrong password!")
            }
        });
    }catch(err){
        res.status(500).json(err);
        console.log("You have not registered");
    }
});


module.exports = router;