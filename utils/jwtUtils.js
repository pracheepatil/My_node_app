const jwt = require('jsonwebtoken');

exports.generateToken = (payload, isRefreshToken=false) => {
  return new Promise((resolve, reject) => {
    if (isRefreshToken) {
      payload.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7); // 7 days in seconds
      payload.refreshToken = true;
    } else {
      payload.exp = Math.floor(Date.now() / 1000) + (60 * 60); // current seconds + 1hour in seconds
      payload.refreshToken = false;
    }
    jwt.sign(payload, process.env.SECRET_ENCRYPTION_KEY, function(err, token) {
      err ? reject(err) : resolve(token);
    })
  })
}

exports.verifyToken = (token, isRefreshToken=false) => {
  return new Promise((resolve, reject) => {
 
    jwt.verify(token, process.env.SECRET_ENCRYPTION_KEY, function(err, decoded) {
      if(err) {
        reject(err)
      } else {
          if (isRefreshToken === decoded.refreshToken) {
            resolve(decoded)
          } else {
            reject({err: 'Invalid Token'});
          } 
        }
      });
    });
}