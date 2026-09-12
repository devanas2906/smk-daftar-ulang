const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    nisn: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
