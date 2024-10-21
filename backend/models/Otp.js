const mongoose = require('mongoose');

const emailOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: '10m', default: Date.now } // Expires after 10 minutes
});

module.exports = mongoose.model('EmailOtp', emailOtpSchema);
