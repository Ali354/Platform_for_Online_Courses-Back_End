const express = require('express');
const {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
      } = require('../controllers/courseController.js');

const router = express.Router();

router.post('/course', addCourse);
router.get('/courses', getAllCourses);
router.get('/course/:id', getCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', deleteCourse);




module.exports = {
    routes: router
}

