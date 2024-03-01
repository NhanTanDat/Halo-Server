const express = require('express');

const router = express.Router();

const {
  getAccounts,
  register,
  login,
  deleteAccount,
  update,
} = require('../controllers/account.controller');

router.route('/').get(getAccounts).post(register);

router.route('/login').post(login);

router.route('/:id').delete(deleteAccount).patch(update);

module.exports = router;
