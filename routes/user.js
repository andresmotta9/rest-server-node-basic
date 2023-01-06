const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/user');
const { isValidRole, existsEmail, existsUserById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);

router.post('/', [
  check('name', 'the name is required').notEmpty(),
  check('password', 'the password must have at least 6 characters').isLength({ min: 6 }),
  check('email', 'the email is not valid').isEmail(),
  check('email').custom(existsEmail),
  check('role').custom(isValidRole),
  validateFields
], postUsers);

router.put('/:id', [
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom(isValidRole),
  validateFields
], putUsers);

router.patch('/', patchUsers);

router.delete('/:id', [
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], deleteUsers);

module.exports = router;