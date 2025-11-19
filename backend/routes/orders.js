// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { requireLogin } = require('../middleware/auth');

// BẮT BUỘC ĐĂNG NHẬP
router.use(requireLogin);

// Xem đơn hàng của chính mình
router.get('/', orderController.getMyOrders);

module.exports = router;