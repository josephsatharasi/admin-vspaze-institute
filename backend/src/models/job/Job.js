const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: String,
  location: String,
  salary: String,
  openings: {
    type: Number,
    default: 1
  },
  description: String,
  requirements: [String],
  deadline: Date,
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  applications: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    appliedAt: Date,
    resume: String,
    coverLetter: String,
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'interview', 'selected', 'rejected'],
      default: 'applied'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
