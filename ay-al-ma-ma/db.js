const admin = require('firebase-admin');
const firebase = require('firebase');

const config = require('./config.js');

const db = firebase.initializeApp(config.firebaseConfig);
const db2 = admin.initializeApp(config.firebaseConfig);
module.exports = db;
// module.exports = { 
//     db
// }