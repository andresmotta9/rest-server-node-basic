const { request, response } = require("express")


const isAdminRole = (req = request, res = response, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'The role is about to be verified without a token validation'
    })
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an administrator - this person can not make this`
    })
  }
  next();
}

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {

    if (!req.user) {
      return res.status(500).json({
        msg: 'The role is about to be verified without a token validation'
      })
    }

    if(!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of this roles ${roles}`
      })
    }

    next();
  }
}

module.exports = {
  isAdminRole,
  hasRole
}