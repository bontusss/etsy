require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/auth');
const otherRoutes = require('./routes/routes');
require('./config/passport')(passport);

const app = express();

// Allow all origins (for testing purposes)
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true, // Allow cookies (session cookies)
}));

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', otherRoutes);

// Auth route to check if user is logged in
app.get('/api/auth-route', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ message: 'Authorized access', user: req.user });
});

// Handle Preflight Requests
app.options('*', cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
