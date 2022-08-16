const express = require('express');
const {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getCoursesByCaegory
      } = require('../controllers/courseController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
 
const router = express.Router();
  
router.post('/course', addCourse);
router.get('/courses', getAllCourses);
router.get('/course/:id', getCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', deleteCourse);
router.get('/coursesByCategory/:category',getCoursesByCaegory);
// router.post('/file',uploadFile)



module.exports = {
    routes: router
}

