const mongoose = require('mongoose')

const managementSchema = new mongoose.Schema({

  
    name: { type:String, required:true,trim:true},
    phone: { type:String, required:true, unique:true,trim:true},
    email: { type:String, required:true,  unique:true,trim:true},
    password: { type:String, required:true,trim:true},
    
   
   

    
},
    { timestamps: true });


module.exports = mongoose.model("SocialAgent", managementSchema)
