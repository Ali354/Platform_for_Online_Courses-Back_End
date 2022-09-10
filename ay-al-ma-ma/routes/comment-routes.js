const express = require('express');
const {
    addComment,
    deleteComment,
    updateComment,
    getAllComments,
    getCommentById
} = require('../controllers/commentController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');

const router = express.Router();

router.post('/comment',addComment);
router.put('/comment/:id',updateComment);
router.get('/comments/:course_id/:lesson_id',getAllComments);
router.get('/comment/:course_id/:lesson_id/:comment_id',getCommentById)
router.delete('/comment/:course_id/:lesson_id/:comment_id',deleteComment);


module.exports = {
    routes: router
}

