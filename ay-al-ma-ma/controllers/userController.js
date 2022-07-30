'use strict';
// require 'firebase/auth';
const jwt_decode = require( "jwt-decode");

const firebase = require('../db.js');
const User = require('../models/user.js');
const UserVerification = require('../models/UserVerification.js');
const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');


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

const addUser = async (req, res) => {
    try {
            const data = req.body;
            var email = data.email;
            var password = data.password;
            const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await firestore.collection('users').doc().set(data);
            // sendverficationEmail(userResponse,req);
            res.json(userResponse);
    } catch (error) {
            res.status(400).send(error.message);
    }
}

const sendverficationEmail = ({_id,email},res)=>{
    const currentURL = "http://localhost:8088/";
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject: "Verify your email",
        html: '<p>Verify your email address to complete the signup and login into your account.</p><p>this link <b>expired in 6 hours</b> .</p><p>Press <a href=${currentURL + "user/verify/"+_id+"/"+uniqueString}here to proceed.</p>'
    }
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString,saltRounds)
        .then((hashedUniqString)=>{
            const newverification = new UserVerification({
                userId: _id,
                uniqueString:hashedUniqString,
                createAt:Date.now(),
                expireAt:Date.now() + 21600000,
            });
            newverification
                .save()
                .then(()=>{
                    transporter
                        .sendMail(mailOptions)
                        .then(()=>{
                            res.json({
                                status:"PENDING",
                                message:"Verification Email Sent",
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.json({
                                status:"FAILED",
                                message:"Verification Email Failed",
                            })
                        })
                })
                .catch((error)=>{
                    console.log(error);
                    res.json({
                        status:"FAILED",
                        message:"Coudnot Save Verification Email Data!",
                    });
                })
        })
        .catch(()=>{
            res.json({
                status:"FAILED",
                message:"An Error occured while hashing email data",
            })
        })
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
}

