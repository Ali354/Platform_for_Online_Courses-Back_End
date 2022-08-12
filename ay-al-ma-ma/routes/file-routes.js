const express = require('express');
const {
    addUser, updateUser
    // 
   } = require('../controllers/userController.js');
  
   const { addVideo } = require('../controllers/videoController.js');
   
const {
    addCourse,
    updateCourse
    // 
   } = require('../controllers/courseController');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
const {uploadFile} = require('../controllers/fileController');
const { addLesson, updateLesson } = require('../controllers/lessonController.js');
const router = express.Router();

/////


router.post('/addUserWithfile',uploadFile,addUser );
router.post('/addCourseWithfile',authTokenVerifyMiddleWare,uploadFile,addCourse);
router.post('/addLessonWithfile',uploadFile,addLesson );
router.post('/addVideo',uploadFile,addVideo);

router.put('/updateUserWithFile',uploadFile,updateUser);
router.put('/updateCourseWithFile',uploadFile,updateCourse);
router.put('/updateLessonWithFile/:lesson_id',uploadFile,updateLesson);

module.exports = {
    routes: router
}

