const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartController'); // <-- thêm dòng này


// Xem giỏ hàng
router.get('/', cartCtrl.viewCart);

// Thêm sản phẩm
router.post('/add/:id', cartCtrl.addToCart);

// Cập nhật số lượng
router.post('/update/:id', cartCtrl.updateQuantity);

// Xóa sản phẩm
router.post('/remove/:id', cartCtrl.removeFromCart);

module.exports = router;
