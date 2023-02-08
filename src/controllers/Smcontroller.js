const scheduleMmodel =require("../Models/Smeetingmodel")
const usermodel = require("../Models/usermodel")
const axios = require('axios')
const mongoose = require('mongoose')

const scheduleMeeting = async (req, res) => {
    // console.log(req.body)
    try {
        let { name,userId,clientlogo,clientName, Date,startingtime, endTime } = req.body
    
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for Schedule a meeting" })
        }
        if (!(name)) {
            return res.status(400).send({ status: false, msg: "Name is mendatory for Create a employee" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
        if (!userId) {
            return res.status(400).send({ status: false, msg: "need the userid for furture process" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId))
            return res.status(400).send({ status: false, msg: "Please enter valid User Id" });
    
            // if(idFromToken !==userId){
            //     return res.status(403).send({ status: false, msg: "Unauthorized Access you are not authorised" });
            // }
        if (!(clientlogo)) {
            return res.status(400).send({ status: false, msg: "clientlogo is mendatory for Schedule a meeting" })
        }
        if (!(clientName)) {
            return res.status(400).send({ status: false, msg: "clientlogo is mendatory for Schedule a meeting" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(clientName)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
        if (!(Date)) {
            return res.status(400).send({ status: false, msg: "Date is mendatory for Schedule a meeting" })
        }
        if(!(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).test(Date))
                        return res.status(400).send({status: false, msg:"Date  format should be YYYY-MM-DD"});

        if (!(startingtime)) {
            return res.status(400).send({ status: false, msg: "startingtime is mendatory for Schedule a meeting" })
        }
        if (!(endTime)) {
            return res.status(400).send({ status: false, msg: "endTime is mendatory for Schedule a meeting" })
        }
        // if (!(employeeid)) {
        //     return res.status(400).send({ status: false, msg: "endTime is mendatory for Schedule a meeting" })
        // }

       
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
         
    let extraClientlogo = await scheduleMmodel.findOne({name:name,userId:userId})
    // console.log(extra)
    if(extraClientlogo){
    let array
    if(extraClientlogo.userId==userId){

        if (!(clientName)) {
        array = extraClientlogo.clientlogo,clientName
       
        array.push(clientlogo,clientName)
       
        let dataforupdate = { "clientlogo,clientName": array, "count": extraClientlogo.count + 1 }
     
        let final = await scheduleMmodel.findOneAndUpdate({ name:name,userId: userId }, { $set: dataforupdate }, { new: true })
        //  console.log(final)
        return res.status(201).send({ status: true, message: "success", data: final })}}
        else{
            let itemforadd = {
                 "name":name,
                "userId": userId,
                "clientlogo": clientlogo,
                "clientName":clientName,
                "Date":Date,
                "startingtime":startingtime,
                "endTime":endTime,
                "count": 1
            }
            let addClient = await scheduleMmodel.create(itemforadd)

            
            let printClient= await scheduleMmodel.findOne({ _id: addClient }).select({ __v: 0, createdAt: 0, updatedAt: 0 })

            clientlogo1 = printClient

            return res.status(201).send({ status: true, message: "success", data: clientlogo1 })
        }
    // }
    }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}





module.exports={scheduleMeeting}