const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createUsername = require('usernamebot');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  username: { type: String, required: true, unique: true, default: () => createUsername() },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Hash password before saving or updating
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Define the comparePassword method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

