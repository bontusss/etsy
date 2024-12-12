const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const createUsername = require('usernamebot');
const router = express.Router();
const crypto = require('crypto');
const sendVerificationEmail = require('../config/sendingEmail');

//registration
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Input validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate username using the external library
    const username = createUsername({ email }); // Adjust the parameters as per the library's API

    // Generate a random code
    const verificationCode = crypto.randomBytes(20).toString('hex');

    // Create new user
    const user = new User({
      email,
      password, // Use the raw password, it will be hashed in the schema middleware
      username, // Use the generated username
      verificationCode, // use verification code
    });
    await user.save();

    await sendVerificationEmail(email, verificationCode);

    // Respond with the created user's details (excluding sensitive data like password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});


// E-mail verification 
router.get('/verify-email', async (req, res) => {
  const { code } = req.query;

  try {
    const user = await User.findOne({ verificationCode: code });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined; // Clear the code after successful verification
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email verification failed' });
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

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
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
