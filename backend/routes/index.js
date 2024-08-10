const express = require("express")// require express
const userRouter= require("./user")

const router =express.Router(); //init  router

// api/v1
router.use("/user",userRouter)



module.exports=router;

