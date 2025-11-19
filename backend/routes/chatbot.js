// backend/routes/chatbot.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// API lưu tin nhắn từ chatbot
router.post('/save-message', async (req, res) => {
  try {
    const { sessionId, sender, message } = req.body;

    const newMsg = new ChatMessage({
      sessionId: sessionId || 'guest_' + Date.now(),
      sender,
      message
    });

    await newMsg.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Lỗi lưu tin nhắn:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;