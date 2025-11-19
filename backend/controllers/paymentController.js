// backend/controllers/paymentController.js
const { createPayment } = require('../utils/momo');
const Order = require('../models/Order');

exports.momoPayment = async (req, res) => {
  try {
    // Kiểm tra giỏ hàng
    if (!req.session.cart || req.session.cart.length === 0) {
      req.flash('error', 'Giỏ hàng trống!');
      return res.redirect('/cart');
    }

    const total = req.session.cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const orderId = 'MYSHOP_' + Date.now();

    req.session.pendingOrder = {
      orderId,
      amount: total,
      cart: req.session.cart,
      userId: req.session.user.id
    };

    const result = await createPayment(orderId, total);
    res.redirect(result.payUrl);

  } catch (err) {
    console.error('Lỗi MoMo:', err);
    req.flash('error', 'Lỗi thanh toán. Vui lòng thử lại!');
    res.redirect('/cart');
  }
};

exports.momoReturn = async (req, res) => {
  if (req.query.resultCode === '0') {
    req.flash('success', 'Thanh toán thành công!');
    // Xóa giỏ hàng
    req.session.cart = [];
  } else {
    req.flash('error', 'Thanh toán thất bại!');
  }
  res.redirect('/cart');
};

exports.momoIpn = (req, res) => {
  console.log('MoMo IPN:', req.body);
  res.json({ status: 'OK' });
};