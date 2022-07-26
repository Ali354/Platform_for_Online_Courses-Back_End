'use strict';
// require 'firebase/auth';
const firebase = require('../db.js');
const User = require('../models/user.js');
const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res, next) => {
    // console.log("GetAllUsers is running!\n");
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
            res.json(userResponse);
    } catch (error) {
            res.status(400).send(error.message);
    }
}

// const addAli = async (req, res) => {
//     try {
//             const data = {"email" : "ali4@gmail.com","password" : "1235453"};
//             var email = "ali4@gmail.com";
//             var password = "1235453";
//             const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
//             await firestore.collection('users').doc().set(data);
//             res.json(userResponse);
//     } catch (error) {
//             res.status(400).send(error.message);
//     }
// }
const updateUser = async (req, res, next) => {
    try {
        // if(!req.body.email){
        const id = req.params.id;
        const data = req.body;
        await firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.password);
        const user =  await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly'); 

        /*
         const userResponse = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await firestore.collection('users').doc().set(data);
            res.json(userResponse);
        */
    // }else{
    //     firebase.auth()
    // .signInWithEmailAndPassword(req.body.email, req.body.password)
    // .then(function(userCredential) {
    //     userCredential.user.updateEmail('newyou@domain.example')
    // })}       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const signin = (req,res,next)=>{
    // console.log(req.body.email+" / "+req.body.password);
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
        // var user = await firebase.auth().getUser(id);
        user1.delete();
        // user.delete();
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


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next()
//     })
//   }
  
const get_User_By_Token = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        
        // res.json(posts.filter(post => post.username === req.user.name))

        // users.filter(user=>user.userName===req.user.userName)
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
                if(user.email === req.user.email ){
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
    // loginUser,
    signin,
    forgetPassword,
    get_User_By_Token,
    // addAli
}

