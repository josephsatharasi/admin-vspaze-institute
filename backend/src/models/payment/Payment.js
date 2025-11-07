const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'other'
  },
  transactionId: String,
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  paymentFor: {
    type: String,
    enum: ['course_fee', 'installment', 'other'],
    default: 'course_fee'
  },
  remarks: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
