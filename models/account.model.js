const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
 
  },
  password: {
    type: String,
    required: true
  },
}, {
    timestamps: true,
    versionKey: false,
});

accountSchema.pre('save', async function(next){
  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(this.password, salt)
    this.password = passwordHashed
    next()
  } catch (error) {
    next(error)
  }
})

accountSchema.methods.isValidPassword = async function(newPassword){
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const Account = mongoose.model('user', accountSchema);

module.exports = Account;