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
router.delete('/lesson', deleteLesson);
router.get('/lessons/:course_id',getAllLessons);


module.exports = {
    routes: router
}

