const jwt = require('jsonwebtoken')
const user = require("../controllers/Econtroller")
const mongoose = require('mongoose')
const usermodel = require('../Models/usermodel')


const authentication = function (req,res,next) {
   try {

    let token = req.headers['x-api-key']
    if(!token){
        return res.status(400).send({status:false,msg:"token must be present for varification"})
    }
    jwt.verify(token,"bricstal-digital-group", function (error, decoded) {
        if (error) return res.status(400).send("this token is invalid")
        else {
           decodedtoken = decoded
         //   const idFromToken =decodedtoken.id
           next()
        }
     })
    
   } catch (error) {
    return res.status(500).send({status:false,msg:error.massege})
   }

}


const authorisation = async (req,res,next)=>{
   try {
const idFromToken =decodedtoken.id
const managementID = req.body.managementid
// let userID = req.params.userId

if(managementID){
   if (!mongoose.Types.ObjectId.isValid(managementID)) {
      return res.status(400).send({ status: false, msg: "Please Enter Valid Id " })
  }
   if(idFromToken !==managementID){
      return res.status(403).send({ status: false, msg: "Unauthorized Access.you are not authorised" });
           }else{
               next()
           }
}



if(user){
   if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).send({ status: false, msg: "Please Enter Valid userID " })
   }
}
} catch (error) {
   return res.status(500).send({status:false,msg:error.massege})
  }

}


module.exports={authentication,authorisation}