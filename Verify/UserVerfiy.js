
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  /*
  firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
  // Send token to your backend via HTTPS
  // ...
}).catch(function(error) {
  // Handle error
});
  */ 

// const authTokenVerifyMiddleWare = (req,res,next)=>{
    
//       var admin = require("firebase-admin");

//       var serviceAccount = require("path/to/serviceAccountKey.json");

//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//       });

//       const tokenString = req.headers['authorization'] ? req.headers['authorization'].split(" "):null;
//       if(!tokenString)
//         res.send("No header provided");
//       else if(!tokenString[1])
//         res.send("No Token provided");
//       else {
//         const {getAuth} = require ('firebase-admin/auth');
//         getAuth()
//         .verifyIdToken(tokenString[1])
//         .then((decodedToken) => {
//           const uid = decodedToken.uid;
//           console.log(uid);
//           next();
//           // ...
//         })
//         .catch((error) => {
//           // Handle error
//         });
//       }

// }

module.exports = { 
    authenticateToken
    // authTokenVerifyMiddleWare
}

