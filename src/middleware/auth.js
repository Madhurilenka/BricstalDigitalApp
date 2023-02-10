const jwt = require('jsonwebtoken')
const user = require("../controllers/Econtroller")
const mongoose = require('mongoose')
const usermodel = require('../Models/usermodel')
const managementModel = require('../Models/managementModel')


const authentication = function (req,res,next) {
   try {

    let token = req.headers['x-api-key']
    if(!token){
        return res.status(400).send({status:false,msg:"token must be present for varification"})
    }
   //  let decodedtoken
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
let managementID = req.body.managementID

let managementdata = await managementModel.findById(managementID)
// console.log(managementdata)
if(!managementdata){
return res.status(404).send({status:false,msg:"this managmentID is not available or you have entered wrong id"})
}


let updateuser = managementdata._id.toString()

if(idFromToken !==updateuser){
   return res.status(403).send({ status: false, msg: "Unauthorized Access!!!...you are not authorised" });
        }else{
            next()
        }

      } catch (err) {
         return res.status(500).send({ status: false, error: err.message });
     }
}





module.exports={authentication,authorisation}