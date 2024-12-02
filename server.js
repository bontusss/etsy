require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/auth');
const otherRoutes = require('./routes/routes');
require('./config/passport')(passport);

const app = express();

// Enable CORS
app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

