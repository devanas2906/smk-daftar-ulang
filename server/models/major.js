const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema(
  {
    majorName: { type: String, required: true, unique: true, trim: true },
    majorCode: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Major', majorSchema);
