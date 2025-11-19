require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// 🔥 Kết nối MongoDB Atlas
// backend/server.js
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("ĐÃ KẾT NỐI THÀNH CÔNG VỚI ATLAS CỦA BẠN!"))
  .catch(err => console.log("Lỗi kết nối Atlas:", err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: 'myshop2025secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(flash());

// Global template variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  res.locals.cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/products'));
app.use('/auth', require('./routes/auth'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));
app.use('/orders', require('./routes/orders')); // Nếu có
app.use('/payment', require('./routes/payment')); // ← THÊM DÒNG NÀY
app.use('/', require('./routes/contact')); // Thêm dòng này
app.use('/', require('./routes/search')); // Thêm dòng này
app.use('/api/chat', require('./routes/chatbot'));
app.use('/', require('./routes/admin'));
// Seed dữ liệu (chỉ chạy 1 lần nếu muốn)
// require('./seed');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend chạy tại: http://localhost:${PORT}`);
});
