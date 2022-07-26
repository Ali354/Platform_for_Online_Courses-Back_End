const firebase = require('firebase');
const config = require('./config.ts');
 
const db = firebase.initializeApp(config.firebaseConfig);


module.exports = db;