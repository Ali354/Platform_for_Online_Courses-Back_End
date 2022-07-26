// require('../models/user');

const express = require('express');
const jwt = require('jsonwebtoken');

const {addUser, 
       getAllUsers, 
       getUser,
       updateUser,
       deleteUser,
       signin,
       forgetPassword,
       get_User_By_Token
      } = require('../controllers/userController.ts');
const { authenticateToken } = require('../Verify/UserVerfiy.ts');

const router = express.Router();


//User CRUD


router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/signin',signin);
router.post('/forgetPassword',forgetPassword);
router.get('/usersToken',authenticateToken,get_User_By_Token);

module.exports = {
    routes: router
}