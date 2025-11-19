// backend/routes/adminOrders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { isAdmin } = require('../middleware/auth'); // Middleware kiểm tra admin

// CHỈ ADMIN MỚI VÀO ĐƯỢC
router.use(isAdmin);

// Trang danh sách tất cả đơn hàng
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email') // Lấy tên + email người mua
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    res.render('admin/orders', { orders });
  } catch (err) {
    req.flash('error', 'Lỗi tải danh sách đơn hàng');
    res.redirect('/admin');
  }
});

module.exports = router;