const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const createUsername = require('usernamebot'); // Generates a base username

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  username: { type: String, required: true, unique: true, default: '' }, // Default will be handled dynamically
});

// Generate unique username before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('username')) {
    let baseUsername = this.username || createUsername(this.fullname); // Generate from fullname if empty
    let username = baseUsername;
    let counter = 0;

    // Ensure username is unique
    while (await mongoose.models.User.findOne({ username })) {
      counter++;
      username = `${baseUsername}${counter}`; // Append a counter to make it unique
    }

    this.username = username;
  }

  // Hash password if modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

// Compare password for login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

