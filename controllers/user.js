const { request, response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

  const { limit = 5, initial = 0 } = req.query;
  const query = { state: true }

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(initial))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  });
}

const postUsers = async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Save in DB
  await user.save();

  res.json({
    user
  });
}

const putUsers = async (req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //TODO validate against db
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  };

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
}

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch Api - Controler'
  });
}

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {state: false}, {new: true})

  res.json({user});
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}