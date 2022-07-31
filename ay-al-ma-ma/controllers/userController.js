'use strict';
// require 'firebase/auth';
const jwt_decode = require( "jwt-decode");
// const firebase_ = require('firebase');
// const config_ = require('../config');

// const db = firebase_.initializeApp(config_.firebaseConfig);

const {v4:uuidv4}= require('uuid');
var bcrypt = require('bcryptjs');
const firebase = require('../db.js');
const User = require('../models/user.js');
const UserVerification = require('../models/userVerification.js');
const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
// const {getAuth} = require ('firebase-admin/auth');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
    }
})
const path = require('path');
const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().userName,
                    doc.data().email,
                    doc.data().password,
                    
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/*
const addUser = async (req, res) => {
    try {
            const data = req.body;
            var email = data.email;
            var password = data.password;
            const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await firestore.collection('users').doc().set(data);
            res.json(userResponse);
    } catch (error) {
            res.status(400).send(error.message);
    }
}
*/
const addUser = async (req, res) => {
            const data = req.body;
            var email = data.email;
            var password = data.password;
            
            //successfuly
            console.log(email);
            const newUser = new User(
                "12",
                "qwasqwas",
                email,
                password,
                false,
            );
            console.log(newUser.email);
            sendverficationEmail(newUser, res);

            //try
            // Admin SDK API to generate the email verification link.
            // const useremail = 'user@example.com';
           
}


const sendverficationEmail = (User,res)=>{
    //successfuly
    const _id = User.id;
    const email = User.email;
    const password = User.password;
    console.log("AAAAAA");
    const currentURL = "http://ay-al-ma-ma.herokuapp.com/api/";
    const uniqueString = "uuidv4()_id";
    console.log(_id);
    const mailOptions = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject: "Notificate User",
         html: '<p>Notification from backend server to the user.</p>'
         //Verify your email address to complete the signup and login into your account.</p><p>this link <b>expired in 6 hours</b></p> <p>Press <a href=${currentURL + "user/verify/" + _id + "/" + uniqueString}>here to proceed</a></p>a<p>Verify your email address to complete the signup and login into your account.</p><p>this link <b>expired in 6 hours</b></p> <p>Press <a href="http://localhost:8088/api/verfied/" onclick="location.href=this.href + '?email' + '/' + '?password'">here to proceed</a>'
           }
    console.log(email,password);
    const saltRounds = 10;
    bcrypt
        const newverification = new UserVerification({
        userId: _id,
        uniqueString:"122233344455",
        createAt:Date.now(),
        expireAt:Date.now() + 21600000,
    });
            console.log("BBBBB");
            console.log("CCCCC");
            transporter
                .sendMail(mailOptions)
                .then(()=>{
                    console.log("CCCCCC");
                    res.json({
                        status:"PENDING",
                        message:"Verification Email Sent",
                    });
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.json({
                                status:"FAILED",
                                message:"Verification Email Failed",
                            })
                        })

    //try
    // const name = "you";
    // const {getAuth} = require ('firebase-admin/auth');
    // getAuth()
    // .generateEmailVerificationLink(email,actionCodeSettings)
    // .then((link) => {
    //     console.log('THENNN');
    //     // Construct email verification template, embed the link and send
    //     // using custom SMTP server.
    //     return sendCustomVerificationEmail(email, name, link);
    // })
    // .catch((error) => {
    //     console.log("Erorrrr");
    //     console.log(error);
    //     // Some error occurred.
    // });

}
const verfied = async (req, res, next) =>{
    console.log("llookkiiloki");
    try {
    console.log("Verified");
    const data = req.params;
    var email = data.email;
    var password = data.password;
    console.log(email,password);
    const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
    await firestore.collection('users').doc().set(data);
    res.json(userResponse);
    res.sendFile(path.join(__dirname,"./../view/verified.html"));
    } catch (error) {
        res.status(400);
        console.log(error);
    }
}
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.password);
        const user =  await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');      
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const signin = (req,res,next)=>{
    const data = req.body;
     console.log(req.body.email+" / "+req.body.password);
    if(!req.body.email ||  !req.body.password){
        return res.status(422).json({
            email:"email is requires",
            password: "password is required",
        });
    }
    const userr = {email : req.body.email, password : req.body.password}
    const accessToken = jwt.sign(userr, process.env.ACCESS_TOKEN_SECRET)
    console.log("// "+accessToken+" //");
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user)=>{
        console.log(user.email);
        // if(!data[0].verified){
        //     res.json({
        //         status:"FAILED",
        //         message:"Email hasnt been verified yet.Check your inbox."
        //     });
        // }
        return res.status(200).json(user);
    })
    .catch(function (error){
        let errorCode = error.code;
        let errorMessage = error.message;
        if(errorCode == "auth/wrong-password"){
            return res.status(500).json({error:errorMessage});
        } else{
            return res.status(500).json({error:errorMessage});
        }
    })

}
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user1 = await firestore.collection('users').doc(id);
        user1.delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const forgetPassword = async(req,res)=>{
    if(!req.body.email){
        return res.status(422).json({email:"email is required"});
        }
    firebase.auth().sendPasswordResetEmail(req.body.email).then(function(){
        return res.status(200).json({status:"password Reset Email sent"});
    }).catch(function(error){
        let errorCode = error.code;
        let errorMessage=error.message;
        if(errorCode=="auth/invalid-email"){
            return res.status(500).json({error:errorMessage});
        }else if(errorCode=="auth/user-not-found"){
            return res.status(500).json({error:errorMessage});
        }
        });
}

const get_User_By_Token = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().userName,
                    doc.data().email,
                    doc.data().password,
                    
                );
                const token =  req.headers.authorization.split('Bearer ')[1];
                var decoded = jwt_decode(token);
                if(user.email === decoded.email ){
                    usersArray.push(user);
                }
            });
            console.log("PS C:\Users\ALI\Desktop\Platform_for_Online_Courses-Back_End\ay-al-ma-ma> heroku restart\n")
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    signin,
    forgetPassword,
    get_User_By_Token,
    // verfiy,
    verfied,
}

