// backend/routes/account.js
const express = require('express');
const {authMiddleware }= require('../middleware');
const {Account} = require('../db');
const {  mongoose } = require('mongoose');

const router = express.Router();
router.get("/balance",authMiddleware,async(req ,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    })
});

router.post("/tranfer",authMiddleware,async(res,req)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to } = req.body;

    //fetch the accounts within the Transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficent balance "
        });
    }
    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"

        });
    }
    // perform the transfer  operation
    await Account.updateOne({ userId:req.userId},{$inc: { balance : -amount}}).session(session);
    await Account.updateOne({ userId: to},{$inc: {balance: amount} }).session(session);

    //commit the Transaction
    await session.commitTransaction();

    res.json({
        message: "transfer successfully"
    });
});

module.exports = router;