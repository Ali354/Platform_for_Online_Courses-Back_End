'use strict';
// require 'firebase/auth';
const jwt_decode = require( "jwt-decode");
const {v4:uuidv4}= require('uuid');
var bcrypt = require('bcryptjs');
const firebase = require('../db.js');
const User = require('../models/user.js');
const UserVerification = require('../models/UserVerification.js');
const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

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

const addUser = async (req, res) => {
    // try {
            const data = req.body;
             var email = data.email;
             var password = data.password;
    //         const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
    //         await firestore.collection('users').doc().set(data);
    //          sendverficationEmail(userResponse,res);
    //         res.json(userResponse);
    // } catch (error) {
    //         res.status(400).send(error.message);
    // }

        // const saltRounds = 0;
        // bcrypt
        // .hash(password, saltRounds)
        // .then((hashedPassword) => {
            console.log(email);
            const newUser = new User(
                "12",
                "qwasqwas",
                email,
                password,
                false,
            );
            console.log(newUser.email);
            // .save()
            // .then((result) => {
                sendverficationEmail(newUser, res);
            // })
            // .catch((err) => {
            //     console.log(err);
            //     res.json({
            //     message: "An Error occuried while saving User Account!!",
            //     });
            // });
        
        // .catch((err) => {
        //     res.json({
        //     message: "An Error occuried while hashing password!!",
        //     });
        // });


}


const sendverficationEmail = (User,res)=>{


    const _id = User.id;
    const email = User.email;
    const password = User.password;
    console.log("AAAAAA");
    const currentURL = "http://localhost:8088/api/";
    const uniqueString = "uuidv4()_id";
    console.log(_id);
    const mailOptions = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject: "Verify your email",
        html: '<p>Verify your email address to complete the signup and login into your account.</p><p>this link <b>expired in 6 hours</b></p> <p>Press <a href=${currentURL + "user/verify/" + _id + "/" + uniqueString}>here to proceed</a></p>a<p>Verify your email address to complete the signup and login into your account.</p><p>this link <b>expired in 6 hours</b></p> <p>Press <a href="http://localhost:8088/api/verfied/" onclick="location.href=this.href + '?email' + '/' + '?password'">here to proceed</a>'
    }
    console.log(email,password);
    const saltRounds = 10;
    bcrypt
        // .hash(uniqueString,saltRounds)
        // .then((hashedUniqString)=>{
            const newverification = new UserVerification({
                userId: _id,
                uniqueString:"122233344455",
                createAt:Date.now(),
                expireAt:Date.now() + 21600000,
            });
            console.log("BBBBB");
            // newverification
            //     .save()
            //     .then(()=>{
                     console.log("CCCCC");
                    transporter
                        .sendMail(mailOptions)
                        .then(()=>{
                            console.log("CCCCCC");
                            res.json({
                                status:"PENDING",
                                message:"Verification Email Sent",
                            });
                            // console.log("CCCCC");

                        })
                        .catch((error)=>{
                            console.log(error);
                            res.json({
                                status:"FAILED",
                                message:"Verification Email Failed",
                            })
                        })
                // })
                // .catch((error)=>{
                //     console.log("QAZWSX");
                //     console.log(error);
                //     res.json({
                //         status:"FAILED",
                //         message:"Coudnot Save Verification Email Data!",
                //     });
                //     // console.log("CCCCCC");
                // })
        // })
        // .catch(()=>{
        //     res.json({
        //         status:"FAILED",
        //         message:"An Error occured while hashing email data",
        //     })
        // })
        // return;
}
//verfiy email

// const verfiy = async (req, res, next) => {
//     try {
//         console.log("Verify:");
//           let {id,uniqueString} = req.params;
//           console.log("Id : "+id);
//           console.log("UniquString : "+uniqueString);
//           UserVerification.find({id})
//           .then((result)=>{
//             if(result.length > 0) {
//              const {expireAt}= result[0];
//              if(expireAt<Date.now()){
//                 UserVerification.deleteOne({id})
//                 .then(result=>{
//                     User
//                         .deleteOne({_id:userId})
//                         .then(()=>{
//                             let message = "Link has expired. Please Signe Up again.";
//                             res.redirect('/user/verified/error=true&message=${message}');
//                         }).catch(error=>{
//                             let message = "Cleaning User with expired unique string failed";
//                             res.redirect('/user/verified/error=true&message=${message}');
//                         })
//                     })
//                 .catch((error)=>{
//                     console.log(error);
//                     let message ="An error occurred while clearing expired user verification record.";
//                     res.redirect('/user/verified/error=true&message=${message}');
//                 });
//              }else{
//                 bcrypt 
//     .compare(uniqueString,hashedUniqueString)
//     .then(result=>{
//         if(result){

//             User
//                 .updateOne({_id:id},{verified:true})
//                 .then(()=>{
//                     UserVerification  
//                         .deleteOne({id})
//                         .then(()=>{
//                             console.log("My Comment");
//                             res.sendFile(path.join(__dirname,"./../view/verified.html")); 
//                         })
//                         .catch(error=>{
//                             consol.log(error);
//                             let message = "An Error occured while finalizaing successful verification.";
//                             res.redirect('/user/verified/error=true&message=${message}');                
//                         })
//                 })
//                 .catch(error=>{
//                     console.log(error);
//                     let message = "An Error occured while updation user record to show verified.";
//                     res.redirect('/user/verified/error=true&message=${message}');     
//                 })

//         }else{
//             let message = "Invalid verification details passed.Check your inbox.";
//             res.redirect('/user/verified/error=true&message=${message}');
    
//         }
//     })
//     .catch(error=>{
//         let message = "An error occured while comparing unique strings.";
//         res.redirect('/user/verified/error=true&message=${message}');
    
//     }) 
//              }
//             }else{
//                 let message ="Account record does not exist or has been verified already.please sign up or login ";
//                 res.redirect('/user/verified/error=true&message=${message}');
//             }
//           })
//           .catch((error)=>{
//             console.log(error);
//         let message ="An error occurred while checking for existing user verification record";
//         res.redirect("/user/verified/error=true&message=${message}");
//           })
//     } catch (error) {
//         res.status(400);
//         // .send(error.message);

//     }
//     // return;
// }
//verfiy page
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
        // send(error.message);
    }
// return;
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
       
        if(!data[0].verified){
            res.json({
                status:"FAILED",
                message:"Email hasnt been verified yet.Check your inbox."
            });
        }
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


///////////////////////////


// REGISTER

// router.post('/register', (req, res) => {
    // let { email, username, password, address, isSeller } = req.body;
    // username = username.trim();
    // email = email.trim();
    // password = password.trim();
    // address = address.trim();
  
    // if (email == ""  username == ""  password == "" || address == "") {
    //   res.json({
    //     message: "Empty input fields!"
    //   });
    // } else if (!/^[a-zA-Z]*$/.test(username)) {
    //   res.json({
    //     message: "Invalid name entered!"
    //   });
    // }
    // else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   res.json({
    //     message: "Invalid email entered!"
    //   });
    // }
    // else if (password.length < 8) {
    //   res.json({
    //     message: "Password is too Short!"
    //   });
    // } else {
    //   User.find({ email })
    //     .then((result) => {
    //       if (result.length) {
    //         res.json({
    //           message: "User with the provided email already exists",
    //         });
        //   } else

        
    
        


///////////////////////////////////


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

