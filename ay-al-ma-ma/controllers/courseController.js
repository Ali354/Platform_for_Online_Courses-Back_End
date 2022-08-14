'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
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
                    doc.data().defTime,
                    doc.data().owner_id,
                    doc.data().imgURL
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
    // console.log("!@#$%");
    try {
            const data = req.body;
             
            // const course = new Course(
            //     data.title,
            //     data.description,
            //     data.lessonsNum,
            //     data.defTime
            // );

            const token =  req.headers.authorization.split('Bearer ')[1];
            var decoded = jwt_decode(token);

            console.log(token);
            console.log(decoded.user_id);
            console.log(data);
             data.owner_id = decoded.user_id;
             console.log(data);

            // await firestore.collection('courses').doc().set(Object.assign({}, course));
            
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
        const id = req.body.id;
        const data = req.body;
        const course =  await firestore.collection('courses').doc(id);
        await course.update(data);
        // res.send(res); 
        res.send({"ookk":"true"});      
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('courses').doc(id);
        course.delete();
        res.send({"ookk":"true"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const uploadFile = async (req,res,next)=>{

// }

module.exports = {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
}
