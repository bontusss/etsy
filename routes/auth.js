const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/user');
const createUsername = require('usernamebot');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../config/sendingEmail');
const session = require('express-session');

const router = express.Router();

// Configure session middleware
router.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,  // Cookie will not be accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
      sameSite: 'lax', // SameSite configuration to allow cookies in cross-origin requests
    },
  })
);


// Initialize Passport.js
router.use(passport.initialize());
router.use(passport.session());

// Registration Route
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all the required fields.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
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
    res.status(500).json({ message: 'An error occurred during registration.', error: error.message });
  }
});


// Email Verification Route
router.get('/verify-email', async (req, res) => {
  const { code } = req.query;

  try {
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verification successful.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during email verification.', error: error.message });
  }
});


// Login Route
// Login Route with custom failure callback
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).json({ message: 'An error occurred during authentication.', error: err.message });
      }

      if (!user) {
          return res.status(400).json({ message: info.message || 'Login failed. Please check your credentials.' });
      }

      // Successful login
      req.login(user, (err) => {
          if (err) {
              return res.status(500).json({ message: 'An error occurred while logging in.', error: err.message });
          }

          res.status(200).json({
              message: 'Login successful',
              user: { email: user.email, username: user.username },
          });
      });
  })(req, res, next);
});




router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred during logout.', error: err.message });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred while destroying the session.', error: err.message });
      }

      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'You have successfully logged out.' });
    });
  });
});


// Authenticated Route
router.get('/auth-route', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in. Please log in first.' });
  }
  res.status(200).json({ message: 'You are successfully authenticated.', user: req.user });
});


// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset email has been sent.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while sending the password reset email.', error: error.message });
  }
});



// password reset
router.post('/reset-password', async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during password reset.', error: error.message });
  }
});

// Public Route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'This is a public route. No authentication required.' });
});


module.exports = router;

