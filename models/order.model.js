const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      requried: true
    },
    total_money: {
      type: Number,
      requried: true,
    },
    payment_method: {
      type: String,
      enum: ["On Delivery", "Online"],
      default: "On Delivery"
    },
    is_payment: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    status: {
        type: String,
        enum: ["pay", "ship", "receive", "rate"], 
        default: "pay"
    },
    cart: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'carttt',
      required: true,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('order', orderSchema);
