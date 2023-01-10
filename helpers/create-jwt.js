const jwt = require('jsonwebtoken');

const createJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('the token could not be created');
      } else {
        resolve(token);
      }
    })
  })
}

module.exports = {
  createJWT
}