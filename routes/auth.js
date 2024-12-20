const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const createUsername = require('usernamebot');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../config/sendingEmail');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const verificationCode = crypto.randomBytes(20).toString('hex');
    const user = new User({ email, password, username: createUsername({ email }), verificationCode });

    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: 'Registration successful! Please verify your email.',
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Email Verification Route
router.get('/verify-email', async (req, res) => {
  const { code } = req.query;

  try {
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Email verification failed', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send password reset email', error: error.message });
  }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
});

module.exports = router;







// Authenticated route
router.get('/auth-route', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ message: 'Authorized access' });
});

// Public route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Public access' });
});

module.exports = router;
