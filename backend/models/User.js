const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  dateOfBirth: { type: Date },
  mobileNumber: { type: String },
  address: { type: String }
});

module.exports = mongoose.model('User', userSchema);