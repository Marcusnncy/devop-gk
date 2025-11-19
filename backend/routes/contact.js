// backend/routes/contact.js
const express = require('express');
const router = express.Router();

// Trang liên hệ
router.get('/contact', (req, res) => {
  res.render('contact', { 
    success: req.flash('success'),
    error: req.flash('error')
  });
});

// Xử lý gửi liên hệ (lưu vào DB hoặc gửi email – ở đây mình lưu tạm vào session để demo)
router.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Kiểm tra đơn giản
  if (!name || !email || !message) {
    req.flash('error', 'Vui lòng điền đầy đủ họ tên, email và tin nhắn!');
    return res.redirect('/contact');
  }

  // Giả lập lưu thành công (bạn có thể lưu vào MongoDB sau)
  console.log("Có khách liên hệ:", { name, email, phone, message });

  req.flash('success', 'Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!');
  res.redirect('/contact');
});

module.exports = router;