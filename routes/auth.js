const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password || !fullname) return res.status(400).json({ message: 'All fields are required' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ email, password, fullname });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Login failed due to:", error);  // Log the error for debugging
    res.status(500).json({ message: 'Login failed' });
  }
});

// Authenticated route
router.get('/auth-route', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ message: 'Authorized access' });
});

// Public route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Public access' });
});

module.exports = router;
