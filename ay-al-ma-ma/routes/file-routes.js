const express = require('express');
const {
    addUser
    // 
   } = require('../controllers/userController.js');
const { authenticateToken ,authTokenVerifyMiddleWare} = require('../Verify/UserVerfiy.js');
const {uploadFile} = require('../controllers/fileController');
const router = express.Router();

/////


router.post('/file',uploadFile,addUser );

module.exports = {
    routes: router
}

