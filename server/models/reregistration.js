const mongoose = require('mongoose');

const reRegistrationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    kartuTandaPendudukUrl: { type: String, required: true },
    kartuTandaPendudukPublicId: { type: String, required: true },
    kartuKeluargaUrl: { type: String, required: true },
    kartuKeluargaPublicId: { type: String, required: true },
    ijazahSmpUrl: { type: String, required: true },
    ijazahSmpPublicId: { type: String, required: true },
    buktiPembayaranUrl: { type: String, required: true },
    buktiPembayaranPublicId: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    status: { type: String, enum: ['draft', 'pending_verification', 'pending', 'revision', 'approved', 'rejected'], default: 'draft' },
    note: { type: String, default: '' },
    sentDate: { type: Date, default: Date.now },
    verificationDate: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReRegistration', reRegistrationSchema);