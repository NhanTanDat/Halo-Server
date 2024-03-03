require('dotenv').config();
const express = require('express');

const router = express.Router();

const {
  getAccounts,
  register,
  login,
  deleteAccount,
  update,
} = require('../controllers/account.controller');
const passport = require('passport')
require('../middlewares/passport')(passport);

const User = require('../controllers/user')

router.route('/signup').post(User.signUp)

router.route('/signin').post(passport.authenticate('local', { session: false }),User.signIn)

router.route('/secret').post( passport.authenticate('jwt', { session: false }),User.secret)

router.route('/updateuser').post(User.updateUser)

// router.route('/').get(getAccounts).post(register);

// router.route('/login').post(login);

// router.route('/:id').delete(deleteAccount).patch(update);

module.exports = router;
