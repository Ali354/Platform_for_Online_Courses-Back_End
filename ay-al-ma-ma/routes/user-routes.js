// require('../models/user');
require('dotenv').config();
const nodemailer = require("nodemailer");
const {v4:uuidv4}= require('uuid');
const express = require('express');
const jwt = require('jsonwebtoken');

const {addUser, 
       getAllUsers, 
       getUser,
       updateUser,
       deleteUser,
       signin,
       forgetPassword,
       get_User_By_Token,
       verfiy,
       verfied 
      } = require('../controllers/userController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');

const router = express.Router();


//User CRUD
let transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})
console.log("562");
transport.verify((error,success)=>{
   console.log("+6362");
    if(error){
        console.log(error);
    }else{
        console.log("Ready for message");
        console.log(success);
    }
})

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/signin',signin);
router.post('/forgetPassword',forgetPassword);
router.get('/usersToken',authTokenVerifyMiddleWare,get_User_By_Token);
// router.get('/user/verfiy/:id/:uniqueString', verfiy);
router.get('/verfied/:email/:password', verfied );

module.exports = {
    routes: router
}


