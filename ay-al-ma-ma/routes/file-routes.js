const express = require('express');
const {
    addUser
    // 
   } = require('../controllers/userController.js');
   
const {
    addCourse
    // 
   } = require('../controllers/courseController');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
const {uploadFile} = require('../controllers/fileController');
const router = express.Router();

/////


router.post('/addUserWithfile',uploadFile,addUser );
router.post('/addCourseWithfile',authTokenVerifyMiddleWare,uploadFile,addCourse);
module.exports = {
    routes: router
}

