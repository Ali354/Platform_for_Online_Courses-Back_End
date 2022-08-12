const express = require('express');
const { getAllCourses } = require('../controllers/courseController.js');
const {
    addLesson,
    deleteLesson,
    getLesson,
    getAllLessons
      } = require('../controllers/lessonController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
 
const router = express.Router();

router.post('/lesson',authTokenVerifyMiddleWare, addLesson);
router.get('/lesson', getLesson);
router.delete('/lesson/:course_id/:lesson_id', deleteLesson);
router.get('/lessons/:course_id',getAllLessons);
router.get('/lesson/:course_id/:lesson_id',getLesson);


module.exports = {
    routes: router
}

