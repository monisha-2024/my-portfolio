const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: 'Please enter a password' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== adminPassword) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const payload = {
    user: {
      isAdmin: true
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET || 'supersecretportfoliojwtkey123!',
    { expiresIn: '2h' },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

// @route   GET api/auth/verify
// @desc    Verify current token
// @access  Private
router.get('/verify', auth, (req, res) => {
  res.json({ verified: true });
});

module.exports = router;
