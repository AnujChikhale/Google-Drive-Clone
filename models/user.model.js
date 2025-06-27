const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [2, "Username must be at least 2 characters long"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [8, "email must be at least 8 characters long"]
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [5, "email must be at least 5 characters long"]
    
    } 
})

const user = mongoose.model('user',userSchema);

module.exports = user