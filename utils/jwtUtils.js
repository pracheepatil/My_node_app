const jwt = require('jsonwebtoken');

// function generateToken(payload, isRefreshToken){
//   return new Promise((resolve, reject) => {
   
//     jwt.sign(payload, "secret", function(err, token) {
//       if(err) {
//         reject(err)
//       } else {
//         resolve(token)
//       }
//     })
//   })
// }

function verifyToken(token){
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret', function(err, decoded) {
      if(err) {
        reject(err)
      }else{
        resolve(decoded)
        // if (Date.now() <= exp * 1000) {
        //   resolve(decoded)
        //   }else { 
        //   console.log(false, 'token is expired') 
        // }      
      }
       });
  });
}



module.exports = {
  //generateToken,
  verifyToken
}