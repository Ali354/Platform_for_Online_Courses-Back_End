'use strict';
// require 'firebase/auth';
var firebase = require('../db.ts');
const Course = require('../models/course.js');
const firestore = firebase.firestore();


const getAllCourses = async (req, res, next) => {
    console.log('GetAllCourses is HERE!');
    try {
        const courses = await firestore.collection('courses');
        const data = await courses.get();
        const coursesArray = [];
        if(data.empty) {
            res.status(404).send('No course record found');
        }else {
            data.forEach(doc => {
                const course = new Course(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().lessonsNum,
                    doc.data().defTime
                );
                coursesArray.push(course);
            });
            res.send(coursesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addCourse = async (req, res) => {
    try {
            const data = req.body;
            var title = data.title;
            var description = data.description;
            var lessonsNum = data.lessonsNum;
            var defTime = data.defTime;
            await firestore.collection('courses').doc().set(data);
            res.json("Course added successfully");
    } catch (error) {
            res.status(400).send(error.message);
    }
}


const getCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('courses').doc(id);
        const data = await course.get();
        if(!data.exists) {
            res.status(404).send('Course with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const updateCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const course =  await firestore.collection('courses').doc(id);
        await course.update(data);
        res.send('Course record updated successfuly');      
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('courses').doc(id);
        course.delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
}
