'use strict';
const jwt_decode = require("jwt-decode");

var firebase = require('../db.js');
const DocFile = require('../models/docFile.js');
const firestore = firebase.firestore();

const addDocFile = async (req, res) => {
    console.log("!@#$%");
    try {
        const data = req.body;
        const token = req.headers.authorization.split('Bearer ')[1];
        var decoded = jwt_decode(token);
        // console.log(token);
        // console.log(data);
        data.owner_id = decoded.user_id;
        //  console.log(data);
        // await firestore.collection('courses').doc().set(Object.assign({}, course));
        await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc(data.lesson_id).collection('files').doc().set(data);
        res.json({"ookk":"true"});
    } catch (error) {
        res.status(400).send(error.message);
    }


}
const getAllfile = async (req, res, next) => {

    const course_id = req.params.course_id;
    const lesson_id = req.params.lesson_id;
    console.log('GetAllLessons is HERE!');
    try {
        const files = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('files');
        const data = await files.get();
        const filesArray = [];
        if (data.empty) {
            res.status(404).send('No files record found');
        } else {
            data.forEach(doc => {
                const file = new DocFile(
                    doc.id,
                    doc.data().lesson_id,
                    doc.data().Course_id,
                    doc.data().title,
                    doc.data().imgURL,
                );
                filesArray.push(file);
            });
            res.send(filesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteDocfile = async (req, res, next) => {
    try {
        
        const course_id = req.params.course_id;
        const lesson_id = req.params.lesson_id;
        const id = req.params.id;
        const lesson = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('files').doc(id);
        lesson.delete();
        res.send({"ookk":"true"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFile = async (req, res, next) => {
    try {
    
        const course_id = req.params.course_id;
        const lesson_id = req.params.lesson_id;
        const id = req.params.id;
        const lesson = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('files').doc(id);
        const thisLesson = await lesson.get();
        if (!thisLesson.exists) {
            res.status(404).send('file with the given ID not found');
        } else {
            res.send(thisLesson.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getFile,
    deleteDocfile,
    getAllfile,
    addDocFile,
    // deleteCourse
}