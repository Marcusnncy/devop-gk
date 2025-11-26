// backend/models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,        // Lưu tên để tránh bị thay đổi sau
  price: Number,       // Giá tại thời điểm mua
  quantity: { type: Number, required: true },
  image: String
});

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number
  }],
  total: Number,
  status: { type: String, default: 'pending' } // pending, processing, completed, cancelled
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);