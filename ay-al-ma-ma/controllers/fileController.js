'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
const Course = require('../models/course.js');
const firestore = firebase.firestore();

const multer = require('multer');

const path = require('path');

const { nextTick } = require("process");
URL = "";
var storage = multer.diskStorage({
    // console.log("2"),
    destination:function(req,file,cb){
        cb(null,"uploadedImages");
        // console.log('2');
    },
    filename:function(req,file,cb){
        URL = ( Date.now()+path.extname(file.originalname));
        cb(null,URL);
        // console.log("3");
    },
});
var upload = multer({storage:storage}).single("file");

const uploadFile = (req,res,next)=>{
   try{ 
    upload(req,res,(err)=>{
        if(err){
            res.send(err);
        }
        else{
        console.log(URL);
        req.body.imgURL = URL;
        // res.send({"ookk":"true"}); 
        next();     
    }})
}catch{
    res.status(400).send(error.message);
}
}

module.exports = {
    uploadFile
}