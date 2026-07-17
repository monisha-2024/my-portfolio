const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { dbAPI } = require('../config/db');

// @route   POST api/messages
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter name, email, and message' });
  }

  try {
    const newMessage = await dbAPI.createMessage({
      name,
      email,
      subject,
      message
    });
    res.json(newMessage);
  } catch (err) {
    console.error('Error saving message:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/messages
// @desc    Get all contact messages
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await dbAPI.getMessages();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
