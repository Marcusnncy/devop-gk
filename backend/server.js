require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// FIX TRIỆT ĐỂ – CHẠY MƯỢT TRÊN DOCKER + LOCAL + RAILWAY + RENDER
const VIEWS_PATH = path.join(__dirname, '../frontend/views');
const PUBLIC_PATH = path.join(__dirname, '../frontend/public');

app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);
app.use(express.static(PUBLIC_PATH));

console.log('Views directory  →', VIEWS_PATH);
console.log('Public directory →', PUBLIC_PATH);

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("ĐÃ KẾT NỐI THÀNH CÔNG VỚI MONGODB ATLAS!"))
  .catch(err => console.log("Lỗi kết nối Atlas:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'myshop2025secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  res.locals.cartCount = req.session.cart?.reduce((sum, i) => sum + i.qty, 0) || 0;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Layout – chỉ dùng cho admin
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', false); // trang người dùng không dùng layout

app.use('/admin', (req, res, next) => {
  app.set('layout', '../../backend/views/admin/layout'); // ĐÚNG 100%
  next();
});

// ROUTES – SẠCH SẼ, KHÔNG TRÙNG, KHÔNG LỖI
app.use('/', require('./routes/products'));
app.use('/auth', require('./routes/auth'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));
app.use('/orders', require('./routes/orders'));
app.use('/payment', require('./routes/payment'));
app.use('/contact', require('./routes/contact'));
app.use('/search', require('./routes/search'));
app.use('/api/chat', require('./routes/chatbot')); // ĐÃ SỬA TỪ use968 → use

// 404 & 500
app.use((req, res) => {
  res.status(404).send('<h1 style="text-align:center; margin-top:100px; color:red;">404 - Không tìm thấy trang</h1><p><a href="/">Về trang chủ</a></p>');
});

app.use((err, req, res, next) => {
  console.error("LỖI SERVER:", err.stack);
  res.status(500).send('<h1 style="text-align:center; margin-top:100px; color:red;">500 - Lỗi server rồi!</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER CHẠY CỰC MƯỢT TẠI → http://localhost:${PORT}`);
  console.log(`VÀO http://localhost:${PORT}/admin ĐỂ THẤY SIÊU PHẨM ADMIN PANEL NGAY BÂY GIỜ!`);
});