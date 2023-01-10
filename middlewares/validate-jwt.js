const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'There is not a token in the request'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    if(!user) {
      return res.status(401).json({
        msg: 'Token is not valid - user is not found in db'
      })
    }

    if(!user.state) {
      return res.status(401).json({
        msg: 'Token is not valid - user is not active'
      })
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}

module.exports = {
  validateJWT
}