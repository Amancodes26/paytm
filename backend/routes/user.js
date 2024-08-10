const express = require("express")

const router = express.Router();
const zod = require("zod");
const {User}= require("../db");
const {jwt}= require("jsonwebtoken");
const{JWT_SECRET}= require("../config");

//api/v1/user

//Signup routes
//validate zod (input are correct)
//database doen't already contain another user

const signupBpdy = zod.object({
    username: zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string(),
})


router.post("/signup",async(req,res)=>{
    const{success} = signupBpdy.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message :"Emaily alresy taken/ Incorrect input"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already taken/ incorrect inputs"
        })

    }
    const user = await User.create({
        username: req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"user created successfully",
        token:token
    })

    

})

//Signinroutes
//zod to validate
const signinBody =zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
    const {success}=signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"incorrect inputs or if you not registered pls register yourself"
        })
    }

    const user = await user.findOne({
        username:req.body.username,
        password:req.body.password,
    });

    if (user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;

    }
    res.status(411).json({
        message:"error while logging in"
    })


})

module.exports=user;

//await wait to fulfillment of promise 
//safeparse a result object contain either parsed data on success or failure in object