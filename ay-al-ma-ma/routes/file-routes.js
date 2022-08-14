const express = require('express');
const {
    addUser, updateUser
    // 
   } = require('../controllers/userController.js');
   
const {
    addCourse,
    updateCourse
    // 
} = require('../controllers/courseController');
const { addVideo } = require('../controllers/videoController.js');

const {
    addDocFile
    // 
} = require('../controllers/docFileController');
const { authenticateToken, authTokenVerifyMiddleWare } = require('../Verify/UserVerfiy.js');
const { uploadFile } = require('../controllers/fileController');
const { addLesson, updateLesson } = require('../controllers/lessonController.js');
const { uploadVideoToCloudinary, uploadFileToCloudinary } = require('../controllers/cloudinaryController');
const router = express.Router();

/////


router.post('/addUserWithfile',uploadFile,addUser );
router.post('/addCourseWithfile',authTokenVerifyMiddleWare,uploadFile,addCourse);
router.post('/addLessonWithfile',authTokenVerifyMiddleWare,uploadFile,addLesson );

router.post('/addVideo',uploadFile, uploadVideoToCloudinary, addVideo);
router.post('/addDocFile', uploadFile,uploadFileToCloudinary,addDocFile);


router.put('/updateUserWithFile',uploadFile,updateUser);
router.put('/updateCourseWithFile',uploadFile,updateCourse);
router.put('/updateLessonWithFile/:id',uploadFile,updateLesson);

module.exports = {
    routes: router
}

