const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

    title: { type:String, required:true, enum:["Mr", "Mrs", "Miss"]},
    name: { type:String, required:true,trim:true},
    gender:{type:String,required:true,enum:["Male","Female","Other"]},
    phone: { type:String, required:true, unique:true,trim:true},
    email: { type:String, required:true,  unique:true,trim:true},
    password: { type:String, required:true,trim:true},
    employeeid:{type:String, required:true,unique:true,trim:true},
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    managementID: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"SocialAgent",trim:true},

    
},
    { timestamps: true });


module.exports = mongoose.model("User", employeeSchema)
