const mongoose = require("mongoose");

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

//creating model in db
const User =mongoose.model("User",userSchema)

//export
module.exports=User;





