require('dotenv').config()
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const userRoutes = require('./routes/user-routes.js');
const courseRoutes = require('./routes/course-routes.js');
const lessonRoutes = require('./routes/lesson-routes.js');

const multer = require('multer');

// const { S3Client } = require('@aws-sdk/client-s3');
// const multerS3 = require('multer-s3');

const app = express();
// const s3 = new S3Client()

app.use(express.json());
app.use(cors()); 

app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', courseRoutes.routes);
app.use('/api', lessonRoutes.routes);

app.use(express.static('uploadedImages'));

const Port_ = process.env.PORT || config.port
const path = require('path');

// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'some-bucket',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   })

// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'uploadedImages',
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   })

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
  
const upload = multer({dest:"uploadedImages/"});

    
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
// }catch(error){
//     res.status(400).send(error.message);
// }
//     // console.log("12zzzzzz121");
// })

app.post('/file', upload.single('file'), (req, res, next)=> {
    res.send('Successfully uploaded files!')
  })

app.listen(Port_, () => console.log('App is listening on url http://localhost:' + Port_));

