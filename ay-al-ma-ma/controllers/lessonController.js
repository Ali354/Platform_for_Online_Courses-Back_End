'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
const Lesson = require('../models/lesson.js');
const firestore = firebase.firestore();

const addLesson = async (req, res) => {
    console.log("!@#$%");
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
const updateLesson = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const lesson =  await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc(id);
        await lesson.update(data);
        res.send('Lesson record updated successfuly');      
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllLessons = async (req, res, next) => {
    
    const  course_id= req.params. course_id;
    console.log('GetAllLessons is HERE!');
    try {
        const lessons = await firestore.collection('courses').doc( course_id).collection('lessons');
        const data = await lessons.get();
        const lessonsArray = [];
        if(data.empty) {
            res.status(404).send('No lessons record found');
        }else {
            data.forEach(doc => {
                const lesson = new Lesson(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().lessonsNum,
                    doc.data().defTime
                );
                lessonsArray.push(lesson);
            });
            res.send(lessonsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllLessons,
    addLesson,
    // getCourse,
    updateLesson
    // deleteCourse
}