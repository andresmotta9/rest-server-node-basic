const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

const existsEmail = async (email = '') => {
  const emailRegistered = await User.findOne({ email });
  if (emailRegistered) {
    throw new Error(`The email: ${email} is already registered`);
  }
};

const existsUserById = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
}