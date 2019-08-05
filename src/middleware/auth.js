require('dotenv').config()

const jwt = require('jsonwebtoken');
// const config = require('../config/config.js')

const verifyToken = (req, res, next) => {
  // Get auth header value
 const bearerHeader = req.headers['authorization'];
 // Check if bearer is undefined
 if(typeof bearerHeader !== 'undefined') {
   // Split at the space
   const bearer = bearerHeader.split(' ');
   // Get token from array
   const bearerToken = bearer[1];
   // Set the token
   req.token = bearerToken;

   // Next middleware, it maybe necessary to write config.jwtSecret instead of proces.env.JWT_SECRET
   jwt.verify(req.token, process.env.JWT_SECRET)
   next()
  }
  else {
   // Forbidden
   res.sendStatus(403);
 }
}

let generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: 86400
})
};

module.exports = {
  verifyToken: verifyToken,
  generateToken: generateToken
}
