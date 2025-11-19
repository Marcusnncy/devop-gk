const Order = require('../models/Order');

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.render('orders', { orders });
  } catch (err) {
    req.flash('error', 'Không thể tải đơn hàng');
    res.redirect('/');
  }
};