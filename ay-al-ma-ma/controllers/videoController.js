'use strict';
const jwt_decode = require( "jwt-decode");

var firebase = require('../db.js');
const Lesson = require('../models/lesson.js');
const Video = require("../models/video.js");
const firestore = firebase.firestore();

const addVideo = async (req, res) => {
    console.log("Add Video is running");
    try {
            const data = req.body;
            // const video = new Video(
            //     data.course_id,
            //     data.lesson_id,
            //     data.imgURL
            //     data.title,
            // );
            await firestore.collection('courses').doc(data.Course_id).collection("lessons").doc(data.lesson_id).collection("videos").doc().set(data);
            res.json("Video added successfully");
    } catch (error) {
            res.status(400).send(error.message);
    }
}

const deleteVideo =  async (req, res, next) => {
    try {
        const data = req.params;
        const course_id = data.course_id;
        const lesson_id = data.lesson_id;
        const video_id = data.video_id;
        const video = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('videos').doc(video_id);
        video.delete();
        res.send('Video deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllVideos = async (req, res, next) => {
    
    const  course_id= req.params.course_id;
    const lesson_id = req.params.lesson_id;
    console.log('getAllVideos is HERE!');
    try {
        const videos = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('videos');
        const data = await videos.get();
        const videosArray = [];
        if(data.empty) {
            res.status(404).send('No videos record found');
        }else {
            data.forEach(doc => {
                const video = new Video(
                    doc.id,
                    doc.data().Course_id,
                    doc.data().lesson_id,
                    doc.data().title,
                    doc.data().imgURL
                  
                );
                videosArray.push(video);
                console.log(video);
            });
            res.send(videosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getVideoById = async (req, res, next) => {
    try {
        const data = req.params;
        const course_id = data.course_id;
        const lesson_id = data.lesson_id;
        const video_id = data.video_id;

        const video = await firestore.collection('courses').doc(course_id).collection('lessons').doc(lesson_id).collection('videos').doc(video_id);
        const thisVideo = await video.get();
        if(!thisVideo.exists) {
            res.status(404).send('Video with the given ID not found');
        }else {
            res.send(thisVideo.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
addVideo,
deleteVideo,
getAllVideos,
getVideoById
}