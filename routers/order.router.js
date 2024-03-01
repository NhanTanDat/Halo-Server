const express = require('express');
const router = express.Router();

const {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

router.route('/').get(getOrder).post(createOrder);
router.route('/:order_id').patch(updateOrder).delete(deleteOrder);

module.exports = router;
