require('dotenv').config()
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const userRoutes = require('./routes/user-routes.js');
const courseRoutes = require('./routes/course-routes.js');

const app = express();

app.use(express.json());
app.use(cors()); 

app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', courseRoutes.routes);

const Port_ = process.env.PORT || config.port

app.listen(Port_, () => console.log('App is listening on url http://localhost:' + Port_));

