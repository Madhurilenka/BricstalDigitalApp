const usermodel = require("../Models/usermodel")
const managementModel= require("../Models/managementModel")
const mongoose = require('mongoose')
const {isValid,isValidObjectId}= require('../validator/validator')

// const twilio = require('twilio');
const accountSid = 'AC2e9e02dedebe1a65a491fcf2f6031180';
const authToken = 'f15c36c6e78a8463f43a1b421744850e';
const client = require('twilio')(accountSid, authToken);

// otpGenerator.generate(4, { digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });


const Createemployee = async (req, res) => {
    // console.log(req)
    
    try {
         
       
        let { title, name, gender, phone, email, password,employeeid,managementID} = req.body
        
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for create a employee" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "Title is mendatory for Create a employee" })
        }
        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res.status(400).send({ status: false, msg: "Title must be only in['Mr','Mrs','Miss']" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mendatory for Create a employee" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
        if (!isValid(gender)) {
            return res.status(400).send({ status: false, msg: "Gender is mendatory for Create a employee" })
        }
        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).send({ status: false, msg: "Gender must be only in['Male','Female','Other']" })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, msg: "Phone number is mendatory for Create a employee" })
        }
        
        if (!(/^[\s]*[6-9]\d{9}[\s]*$/).test(phone)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid phone Number" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is mendatory for Create a employee" })
        }
        if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/).test(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
        }
        // console.log("21")

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
        }
        if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {
            return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
        }
        if (!isValid(employeeid)) {
            return res.status(400).send({ status: false, msg: "employeeid is mendatory for Create a employee" })
        }
        if (!(/^[a-zA-Z0-9]+$/).test(employeeid)) {
            return res.status(400).send({ status: false, msg: "please Enter valid employeeid " })
        }

        if (!isValid(managementID)) {
            return res.status(400).send({ status: false, msg: "need the managementID for furture process" })
        }
        // console.log("55")
        if (!isValidObjectId(managementID))
            return res.status(400).send({ status: false, msg: "Please enter valid managementID" });
    //  console.log("2")
        let existphone = await usermodel.findOne({ phone: phone })
        if (existphone) {
             return res.status(400).send({ status: false, msg: "employee with this phone number is already registered." }) 
            }

        let existEmail = await usermodel.findOne({ email: email })
        if (existEmail) {
             return res.status(400).send({ status: false, msg: "employee with this email is already registered" }) 
            }

        let existemployeeid = await usermodel.findOne({ employeeid: employeeid })
        if (existemployeeid) { 
            return res.status(400).send({ status: false, msg: "employee with this employeeid is already registered" }) 
        }
       

        let savedData = await usermodel.create(req.body);
        return res.status(201).send({ status: true, message: 'Success', data: savedData });
       
    } catch (err) {
       
        return res.status(500).send({ status: false, msg: err.massege })
        
    }

}




const getemployee = async (req, res) => {
    try {
        const filter = { isDeleted: false }

            const { employeeid } = req.query
             {
            if (employeeid) {
                filter['employeeid'] = employeeid
            }
      }
        const saveData = await usermodel.find(filter).select({  managementID: 0})


       

// generate a random 4-digit code
const code = Math.floor(1000 + Math.random() * 9000);
 
// send the code via SMS
client.messages
      .create({
         body: `Your verification code is from social Agent : ${code}`,
         from: '+12066728674',
         to: '+919348186534'
       })
      .then(message => console.log(message.sid));
      console.log(code)
        if (Object.keys(saveData).length == 0)
            return res.status(404).send({ status: false, msg: "No Such employee found" })

        return res.status(200).send({ status: true, message: 'found', data: saveData })
    }catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}


//client.verify.v2
// .services(verifySid)
// .verifications.create({ to: "+919348186534", channel: "sms" })
// .then((verification) => console.log(verification.status))
// .then(() => {
//   const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   readline.question("Please enter the OTP:", (otpCode) => {
//     client.verify.v2
//       .services(verifySid)
//       .verificationChecks.create({ to: "+919348186534", code: otpCode })
//       .then((verification_check) => console.log(verification_check.status))
//       .then(() => readline.close());
//   });
// });
// });


module.exports = { Createemployee ,getemployee}