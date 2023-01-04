const {request, response } = require('express')

const getUsers = (req = request, res = response) => {

  const {name, page = 1, limit = 10} = req.query;

  res.json({
    msg: 'get Api - Controler',
    name,
    page,
    limit
  });
}

const postUsers = (req, res = response) => {

  const {name, age} = req.body;

  res.json({
    msg: 'post Api - Controler',
    name,
    age
  });
}

const putUsers = (req, res = response) => {

  const id = req.params.id;

  res.json({
    msg: 'put Api - Controler',
    id
  });
}

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch Api - Controler'
  });
}

const deleteUsers = (req, res = response) => {
  res.json({
    msg: 'delete Api - Controler'
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}