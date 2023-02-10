const scheduleMmodel =require("../Models/Smeetingmodel")
const usermodel = require("../Models/usermodel")
const axios = require('axios')
const mongoose = require('mongoose')
const {isValid,isValidObjectId}= require('../validator/validator')








const scheduleMeeting = async (req, res) => {
    // console.log(req.body)
    try {
         const { name,userId,clientlogo,clientName,MeetingInformation} = req.body
        // const files = req.files


        // if (!keyValid(files))
        //     return res.status(400).send({ status: false, message: "profile Image is Mandatory" })

            // let clientlogo1 = await imgUpload.uploadFile(files[0]) 


        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for Schedule a meeting" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mendatory for Create a employee" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
        if (!userId) {
            return res.status(400).send({ status: false, msg: "need the userid for furture process" })
        }
        if (!isValidObjectId(userId))
            return res.status(400).send({ status: false, msg: "Please enter valid User Id" });
    
          
        if (!isValid(clientlogo)) {
            return res.status(400).send({ status: false, msg: "clientlogo is mendatory for Schedule a meeting" })
        }
        if (!isValid(clientName)) {
            return res.status(400).send({ status: false, msg: "clientlogo is mendatory for Schedule a meeting" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(clientName)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
       
    //     if (!(MeetingInformation)) 
    //           return res.status(400).send({ status: false, message: "MeetingInformation is mandatory" })
    //         //   console.log("22")
    //         //   let MeetingInformationparse,
    //          const  MeetingInformationparse = JSON.parse(MeetingInformation)
    //    console.log(44)
    //     if(MeetingInformationparse){

    //     if (!isValid(MeetingInformationparse.Date)) 
    //         return res.status(400).send({ status: false, msg: "Date is mendatory for Schedule a meeting" })
    
    //     if(!(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).test(MeetingInformationparse.Date))
    //                     return res.status(400).send({status: false, msg:"Date  format should be YYYY-MM-DD"});
        
    //     //  if (!isValid(MeetingInformationparse.Day)) 
    //     //     return res.status(400).send({ status: false, msg: "Day is mendatory for Schedule a meeting" })
    //     // 
    //     // if(!(/^(?:sun(?:day)?|mon(?:day)?|tue(?:sday)?|wed(?:nesday)?|thu(?:rsday)?|fri(?:day)?|sat(?:urday)?)$/i).test(MeetingInformationparse.Date))
    //     //                 return res.status(400).send({status: false, msg:"Day should be monday|tuesday|wednesday|thursday|friday|saturday|sunday"});

    //     if (!isValid(MeetingInformationparse.startingtime)) 
    //         return res.status(400).send({ status: false, msg: "startingtime is mendatory for Schedule a meeting" })
        
    //     if (!isValid(MeetingInformationparse.endTime)) 
    //         return res.status(400).send({ status: false, msg: "endTime is mendatory for Schedule a meeting" })
        
    // } else {
    //          return res.status(400).send({ status: false, message: "Please provide MeetingInformation for Schedule a meeting" })
    //      }

       
        let correctLink = false
        await axios.get(clientlogo)
            .then((res) => { if (res.status == 200 || res.status == 201) correctLink = true; })
            .catch((error) => { correctLink = false })
        if (correctLink == false)return res.status(400).send({ status: false, message: "invalid url please enter valid url!!" });
        let clientlogo1 = await usermodel.findOne({name:name, userId:userId})
        // console.log(extraLink)
        if(!clientlogo1){
            return res.status(400).send({status:false,msg:"no client is found with this logo"})
        }
         
    let extraClientlogo = await scheduleMmodel.find({name:name,userId:userId})
    // console.log(extra)
    if(extraClientlogo){
    let array
    if(extraClientlogo.userId==userId){
        
        // if (!(clientName)) {
        array = extraClientlogo.clientlogo
       
        array.push(clientlogo)
       
        let dataforupdate = { "clientlogo": array, "count": extraClientlogo.count + 1 }
     
        let final = await scheduleMmodel.findOneAndUpdate({name:name,userId: userId }, { $set: dataforupdate }, { new: true })
        //  console.log(final)
        return res.status(201).send({ status: true, message: "success", data: final })}}
        else{
            let itemforadd = {
                 "name":name,
                "userId": userId,
                "clientlogo": clientlogo,
                "clientName":clientName,
                // "MeetingInformationparse":MeetingInformation,
                "count": 1
            }
        
            let addClient = await scheduleMmodel.create(itemforadd)
           
            
            let printClient= await scheduleMmodel.findOne({ _id: addClient }).select({ __v: 0, createdAt: 0, updatedAt: 0 })

            clientlogo1 = printClient

            return res.status(201).send({ status: true, message: "success", data: clientlogo1 })
        }
    // }
    // }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}





module.exports={scheduleMeeting}




// "MeetingInformation":{
//     "Date":"2023-02-15",
//     "startingtime" :3.00 ,
//      "endTime":4.00
// },