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
  orderId: { type: String, required: true, unique: true }, // Mã MoMo trả về
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, default: 'momo' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);