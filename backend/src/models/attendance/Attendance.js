const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  records: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'absent'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
