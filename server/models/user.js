const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    isDefaultPassword: { type: Boolean, default: false },
    role: { type: String, enum: ['student', 'admin'], required: true },
    accountStatus: {
      type: String,
      enum: ['pending_verification', 'active', 'non_active', 'rejected'],
      default: 'active'
    },
    scheduledDeletionAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);