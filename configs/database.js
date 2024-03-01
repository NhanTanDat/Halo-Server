const mongoose = require('mongoose');
const Account = require('../models/account.model');
const { ACC_ADMIN } = require('./configuration');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoe-api');
    const acc_admin = await Account.findOne({
      username: ACC_ADMIN.username,
    });
    if (!acc_admin) {
      await Account.create(ACC_ADMIN);
      console.log('admin account created');
    }
    console.log('connect db success');
  } catch (error) {
    console.log('Connect database error');
  }
};

module.exports = connectDB;
