const mongoose = require('mongoose');
const schema = new mongoose.Schema
({
    senderID:{
        type:String,
        required:true
    },
    reciverID:{
        type:String,
        required:true
    },
    messages:{
        type:String,
        required:true
    },
    isread:{
        type:Boolean,
        required:true
    }
    
})

module.exports = mongoose.model("messages", schema);