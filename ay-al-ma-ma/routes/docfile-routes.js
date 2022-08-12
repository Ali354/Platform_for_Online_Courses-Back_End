const express = require('express');
const {
    getFile,
    deleteDocfile,
    getAllfile,

      } = require('../controllers/docFileController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
 
const router = express.Router();


router.get('/docfile/:course_id/:lesson_id/:id', getFile);
router.delete('/docfile/:course_id/:lesson_id/:id', deleteDocfile);
router.get('/docfiles/:course_id/:lesson_id', getAllfile);


module.exports = {
    routes: router
}

