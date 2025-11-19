// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const paymentCtrl = require('../controllers/paymentController');
const { requireLogin } = require('../middleware/auth');

// Route thanh toán MoMo - BẮT BUỘC đăng nhập
router.get('/momo', requireLogin, paymentCtrl.momoPayment);

// Route quay lại sau khi thanh toán MoMo
router.get('/momo-return', paymentCtrl.momoReturn);

// IPN (MoMo gọi lại server)
router.post('/momo-ipn', paymentCtrl.momoIpn);

module.exports = router;