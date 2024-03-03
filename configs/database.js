const mongoose = require('mongoose');
const Account = require('../models/account.model');
const { ACC_ADMIN } = require('./configuration');

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    const options = {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    };

    await mongoose.connect(DB, options);
    console.log("DB Connection successful");
  } catch (error) {
    console.error("Connect database error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
