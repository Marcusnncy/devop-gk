// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.loginPage = (req, res) => res.render('login');
exports.registerPage = (req, res) => res.render('register');

exports.register = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    req.flash('error', 'Mật khẩu không khớp!');
    return res.redirect('/auth/register');
  }

  const existed = await User.findOne({ email });
  if (existed) {
    req.flash('error', 'Email đã được đăng ký!');
    return res.redirect('/auth/register');
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ 
    username, 
    email, 
    password: hashed,
    isAdmin: false  // mặc định không phải admin
  });

  req.flash('success', 'Đăng ký thành công! Đăng nhập ngay');
  res.redirect('/auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    req.flash('error', 'Email hoặc mật khẩu sai!');
    return res.redirect('/auth/login');
  }

  // ĐOẠN QUAN TRỌNG NHẤT – BẮT BUỘC PHẢI CÓ isAdmin!!!
  req.session.user = {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin || false   // ← Dòng này quyết định bạn có vào được /admin hay không!
  };

  req.flash('success', `Chào mừng ${user.username}!`);
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.log('Lỗi xóa session:', err);
    res.redirect('/');
  });
};