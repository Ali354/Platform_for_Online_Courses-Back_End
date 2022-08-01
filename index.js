require('dotenv').config()
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const userRoutes = require('./routes/user-routes.js');
const courseRoutes = require('./routes/course-routes.js');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(cors()); 

app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', courseRoutes.routes);

app.use(express.static('uploadedImages'));

const Port_ = process.env.PORT || config.port
const path = require('path');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploadedImages/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    },
});

var upload = multer({storage:storage}).single('file');

app.post('/file',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(req.file.path);
    })
})

app.listen(Port_, () => console.log('App is listening on url http://localhost:' + Port_));

