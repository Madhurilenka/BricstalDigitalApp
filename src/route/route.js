const express =require('express');
const router = express.Router();
const employee = require('../controllers/Econtroller');
const management = require('../controllers/managemnetcontroller')
const sceduleMeeting = require('../controllers/Smcontroller')
const {authentication,authorisation}= require('../middleware/auth')


router.post("/management",management.CreateManagement)
router.post("/Mlogin",management.Login)
// middleware.authorisation,middleware.authentication,
// router.post("/Eregister",employee.Createemployee)
router.post("/Eregister",authentication,authorisation,employee.Createemployee)
router.get("/getemployee",employee.getemployee)
// router.post("/empolyee",singin.singin)


router.post("/sceduleMeeting",sceduleMeeting.scheduleMeeting)

module.exports=router