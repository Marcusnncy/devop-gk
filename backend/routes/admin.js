// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');

// Middleware kiểm tra admin
const requireAdmin = (req, res, next) => {
  if (req.session?.user?.isAdmin) return next();
  req.flash('error', 'Bạn không có quyền admin!');
  res.redirect('/');
};

// BẮT ĐẦU TỪ ĐÂY: bảo vệ toàn bộ route /admin/*
router.use(requireAdmin);

// 1. Trang chính của admin (khi gõ /admin hoặc /admin/)
router.get('/', (req, res) => {
  res.redirect('/admin/products'); // chuyển thẳng vào quản lý sản phẩm
});

// 2. Hoặc nếu bạn muốn có trang dashboard riêng đẹp hơn thì dùng cái này:
// router.get('/', adminCtrl.dashboard); // nếu bạn có hàm dashboard

// Các route còn lại (giữ nguyên)
router.get('/products', adminCtrl.getProducts);
router.get('/products/add', adminCtrl.addProductPage);
router.get('/products/edit/:id', adminCtrl.editProductPage);
router.post('/products/save', adminCtrl.addEditProduct);
router.post('/products/delete/:id', adminCtrl.deleteProduct);

module.exports = router;