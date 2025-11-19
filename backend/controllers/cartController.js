const Product = require('../models/Product');

exports.viewCart = (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  res.render('cart', { cart, total });
};

exports.addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      req.flash('error', 'Sản phẩm không tồn tại');
      return res.redirect('back');
    }

    if (!req.session.cart) req.session.cart = [];

    const existItem = req.session.cart.find(i => i.product._id.toString() === product._id.toString());
    if (existItem) existItem.qty += 1;
    else req.session.cart.push({ product, qty: 1 });

    req.flash('success', `"${product.name}" đã được thêm vào giỏ hàng!`);
    res.redirect('back');
  } catch (err) {
    req.flash('error', 'Lỗi khi thêm vào giỏ');
    res.redirect('back');
  }
};

exports.removeFromCart = (req, res) => {
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(i => i.product._id.toString() !== req.params.id);
  }
  req.flash('success', 'Đã xóa sản phẩm khỏi giỏ hàng');
  res.redirect('/cart');
};

exports.updateQuantity = (req, res) => {
  const qty = parseInt(req.body.qty);
  if (isNaN(qty) || qty < 1) {
    req.flash('error', 'Số lượng không hợp lệ');
    return res.redirect('/cart');
  }
  const item = req.session.cart.find(i => i.product._id.toString() === req.params.id);
  if (item) item.qty = qty;
  req.flash('success', 'Đã cập nhật số lượng');
  res.redirect('/cart');
};
