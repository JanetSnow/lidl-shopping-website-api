const router = require("express").Router();
const KEY = "sk_test_51NTQF2F5QMnxbnCZuZuwyXBoxFGuSwbxvs7ftoLID7i29uprVvHvviOJOCaS6bY7ohxuWSDnVNRIjRYNOJ7K9AZi00ij4Df8wI";
// const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"gbp",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;