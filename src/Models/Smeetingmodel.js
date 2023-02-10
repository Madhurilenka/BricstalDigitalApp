const mongoose = require('mongoose')

const meetingeSchema = new mongoose.Schema({

    name:{ type:String, required:true,trim:true},
    clientlogo: { type:String, required:true,trim:true},
    clientName: { type:String, required:true,trim:true},
    // MeetingInformation: {
    //       Date: {type: Date,required: true,trim: true,},
    //     //   Day: {type:String, required:true,trim:true },
    //       startingTime: {type: Number,required: true,trim:true},
    //       endTime:{type: Number,required: true,trim: true},
    //     },
    userId:{type:mongoose.Schema.Types.ObjectId, required:true,ref:"user",trim:true},
    isDeleted: {type:Boolean, default: false},
    
},
    { timestamps: true });


module.exports = mongoose.model("Meeting", meetingeSchema)