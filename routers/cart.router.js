const express = require('express');
const router = express.Router();

const {
  getCarts,
  createCart,
  deleteItem,
} = require('../controllers/cart.controller');

router.route('/:user').get(getCarts).post(createCart);

router.route('/:user/:shoe').delete(deleteItem);

module.exports = router;
