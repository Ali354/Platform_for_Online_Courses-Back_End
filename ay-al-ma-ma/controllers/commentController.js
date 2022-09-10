'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
const Lesson = require('../models/lesson.js');
const Comment = require("../models/comment.js");
const firestore = firebase.firestore();

const addComment = async (req, res) => {
    console.log("Add Comment is running");
    try {
        // req.body.likes = 0;
        // req.body.disLikes = 0;
            const data = req.body;
            await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc(data.lesson_id).collection("comments").doc().set(data);
            res.json({"ookk":"true"});
    } catch (error) {
            res.status(400).send(error.message);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const comment =  await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc(data.lesson_id).collection("comments").doc(id);
        await comment.update(data);
        res.send({"ookk":true});      
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteComment =  async (req, res, next) => {
    try {
        const data = req.params;
        const course_id = data.course_id;
        const lesson_id = data.lesson_id;
        const comment_id = data.comment_id;
        const video = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('comments').doc(comment_id);
        video.delete();
        res.send({"ookk":"true"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllComments = async (req, res, next) => {
    
    const  course_id= req.params.course_id;
    const lesson_id = req.params.lesson_id;
    console.log('getAllComments is HERE!');
    try {
        const comments = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('comments');
        const data = await comments.get();
        const commentsArray = [];
        if(data.empty) {
            res.status(404).send('No comments record found');
        }else {
            data.forEach(doc => {
                const comment = new Comment(
                    doc.id,
                    doc.data().owner_id,
                    doc.data().course_id,
                    doc.data().lesson_id,
                    doc.data().text,
                    // doc.data().likes,
                    // doc.data().disLikes,
                  
                );
                commentsArray.push(comment);
                console.log(comment);
            });
            res.send(commentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCommentById = async (req, res, next) => {
    try {
        const data = req.params;
        const course_id = data.course_id;
        const lesson_id = data.lesson_id;
        const comment_id = data.comment_id;

        const comment = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('comments').doc(comment_id);
        const thisComment = await comment.get();
        if(!thisComment.exists) {
            res.status(404).send('Comment with the given ID not found');
        }else {
            res.send(thisComment.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
addComment,
deleteComment,
getAllComments,
getCommentById,
updateComment
}