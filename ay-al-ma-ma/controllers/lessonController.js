'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
const Course = require('../models/lesson.js');
const firestore = firebase.firestore();

const addLesson = async (req, res) => {
    // console.log("!@#$%");
    try {
            const data = req.body;
             
            const lesson = new Lesson(
                data.Course_id,
                data.title,
                data.description,
                data.defTime
            );

            const token =  req.headers.authorization.split('Bearer ')[1];
            var decoded = jwt_decode(token);

            console.log(token);
            console.log(data);
             data.owner_id = decoded.user_id;
             console.log(data);

            // await firestore.collection('courses').doc().set(Object.assign({}, course));
            
            await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc().set(data);
            res.json("lesson added successfully");
    } catch (error) {
            res.status(400).send(error.message);
    }
}

module.exports = {
   // getAllCourses,
    addLesson,
    // getCourse,
    // updateCourse,
    // deleteCourse
}