const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    schoolName: { type: String, required: true, trim: true },
    schoolAddress: { type: String, required: true, trim: true },
    schoolEmail: { type: String, required: true, trim: true },
    schoolNumberPhone: { type: String, required: true, trim: true },
    principalName: { type: String, required: true, trim: true },
    treasurerName: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);