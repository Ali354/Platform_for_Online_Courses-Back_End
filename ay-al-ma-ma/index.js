require('dotenv').config()
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const userRoutes = require('./routes/user-routes.js');
const courseRoutes = require('./routes/course-routes.js');
const lessonRoutes = require('./routes/lesson-routes.js');
const fileRoutes = require('./routes/file-routes.js');
const docFileRoutes=require('./routes/docfile-routes.js');
var path = require('path');
// const multer = require('multer');
const app = express();

app.use(express.json());
app.use(cors()); 

app.use(bodyParser.json());


app.use(express.static('public')); 
app.use('/uploadedImages', express.static('uploadedImages'));

// app.use(express.static(path.join("uploadedImages", 'public')));
app.use('/api', userRoutes.routes);
app.use('/api', courseRoutes.routes);
app.use('/api', lessonRoutes.routes);
app.use('/api', fileRoutes.routes);
app.use('/api',docFileRoutes.routes);

// app.use(express.static("uploadedImages"));

const Port_ = process.env.PORT || config.port
// const path = require('path');

// var storage = multer.diskStorage({
//     // console.log("2"),
//     destination:function(req,file,cb){
//         cb(null,"uploadedImages");
//         // console.log('2');
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+path.extname(file.originalname));
//         // console.log("3");
//     },
// });
  
// var upload = multer({storage:storage}).single("file");

    
// app.post('/file',(req,res)=>{
//     // console.log("1");
//    try{ 
//     upload(req,res,(err)=>{
//         if(err){
//             // console.log("000000000");
//             res.send(err);
//         }
//         else{
//         // console.log("res");
//         res.send({"ookk":"true"});      
//         // res.send('File Uploaded Successfully!!');
//     }})
// }catch{
//     res.status(400).send(error.message);
// }
//     // console.log("12zzzzzz121");
// })

/*
 
const upload = multer({dest:"uploadedImages/"});
app.post('/file', upload.single('file'), (req, res, next)=> {
    res.send('Successfully uploaded files!')
  })
 
*/

app.listen(Port_, () => console.log('App is listening on url http://localhost:' + Port_));

