const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Score', scoreSchema);

// const Score = mongoose.model('Score', scoreSchema);

// module.exports = Score;
