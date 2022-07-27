
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  console.log('!!!!');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }


const authTokenVerifyMiddleWare = (req,res,next)=>{
      var admin = require("firebase-admin");
      var serviceAccount = require("../ay-al-courses-platform-firebase-adminsdk-us5c8-3a192a4357.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      // const authHeader = req.headers['authorization']
      // const tokenString = authHeader && authHeader.split(' ')[1]
      const token =  req.headers.authorization.split('Bearer ')[1];
      const tokenString = req.headers['authorization'] ? req.headers['authorization'].split(" "):null;
      if(!tokenString)
        res.send("No header provided");
      else if(!tokenString[1])
        res.send("No Token provided");
      else {
        const {getAuth} = require ('firebase-admin/auth');
        getAuth()
        .verifyIdToken(tokenString[1])
        .then((decodedToken) => {
           const email = decodedToken.email;
          console.log(email);
          next();
        })
        .catch((error) => {
          res.send("!!! "+error.message);
        });
      }
}
module.exports = { 
    authenticateToken,
    authTokenVerifyMiddleWare
}

