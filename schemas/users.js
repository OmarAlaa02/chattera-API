const mongoose = require('mongoose');
const schema = new mongoose.Schema
({
    phone:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model("users", schema);