const mongoose = require("mongoose");
const { MONGO_URI } = require('./config');


const Schema = mongoose.Schema
//schema for user
let userSchema = new Schema({
    
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,

    },
    password:{
        type:String,
        required:true,
        trim:true,//remove white space character 
        minLength:6,

    },
    
    firstName:{
          type:String,
          required:true,
          trim:true,
          minLength:3,
          maxLength:50,
          
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50,
    },

    

})
const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

//creating model in db
const User =mongoose.model("User",userSchema)

//export
module.exports={
    User,
    Account,
};





