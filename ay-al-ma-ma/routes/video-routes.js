const express = require('express');
const {
    addVideo,
    deleteVideo,
    getVideoById,
    getAllVideos
} = require('../controllers/videoController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');

const router = express.Router();

router.post('/video',addVideo);
router.get('/videos/:course_id/:lesson_id',getAllVideos)
router.get('/video/:course_id/:lesson_id/:video_id',getVideoById)
router.delete('/video/:course_id/:lesson_id/:video_id',deleteVideo);


module.exports = {
    routes: router
}

