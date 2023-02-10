const managementModel = require("../Models/managementModel");
const jwt = require('jsonwebtoken')
const {isValid}= require('../validator/validator')


const CreateManagement = async (req,res)=>{
    try {
        let{name,phone,email,password} = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for create a employee" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is mendatory for Create a employee" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
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
        if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{2,4}$/).test(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
        }
        if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {
            return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
        }
        let existphone = await managementModel.findOne({ phone: phone })
        if (existphone) {
             return res.status(400).send({ status: false, msg: " this phone number is already registered." }) 
            }

        let existEmail = await managementModel.findOne({ email: email })
        if (existEmail) {
             return res.status(400).send({ status: false, msg: " this email is already registered" }) 
            }

            let savedData = await managementModel.create(req.body);
            return res.status(201).send({ status: true, message: 'Success', data: savedData });
        } catch (err) {
            return res.status(500).send({ status: false, msg: err.massege })
    
        }
    

}

const Login = async (req, res) => {
    try {

        const { email,password } = req.body
        if (!email) {
            return res.status(400).send({ status: false, msg: "email is mandatory for logging In" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "password is mandatory for logging In" })
        }

        let data = await managementModel.findOne({ email:email ,password:password})

        if (!data) {
            return res.status(400).send({ status: false, msg: "datais incorrect.Please recheck it" })
        }
        
        let token = await jwt.sign({ id: data._id.toString() }, "bricstal-digital-group")
        res.header({ "x-api-key": token })
        return res.status(200).send({ status: true, message: "Login Successful", data: token })
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }


}


module.exports={CreateManagement,Login}