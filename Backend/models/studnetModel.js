const mongoose = require("mongoose");

// Create Schema

const userSchema = new mongoose.Schema({
    name  : {
        type:String,
        required:true
    },
    id : {
        type:String,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    mobileNo : {
        type:Number,
        required:true,
    }
})

//Create Model

const User = mongoose.model('User' , userSchema )
module.exports = User;
