const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/create-jwt');

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    //Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / password are not correct - email'
      })
    }

    //Verify if the user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / password are not correct - state : false'
      })
    }

    //Verify if the password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / password are not correct - Password'
      })
    }

    const token = await createJWT(user.id)

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Please contact the adminstrator'
    })
  }

}


module.exports = {
  login
}