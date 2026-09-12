const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema(
  {
    entryYear: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Batch', batchSchema);
