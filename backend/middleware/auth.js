// backend/middleware/auth.js
exports.requireLogin = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error', 'Bạn cần đăng nhập để thanh toán!');
  res.redirect('/auth/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  req.flash('error', 'Bạn không có quyền truy cập!');
  res.redirect('/');
};