const express = require("express")// require express
const userRouter= require("./user")
const accountRouter = require("./account");

const router =express.Router(); //init  router

// api/v1
router.use("/user",userRouter)
router.use("/account", accountRouter);


module.exports=router;

