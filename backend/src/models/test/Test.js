const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'test'],
    default: 'test'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    default: 100
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    marks: Number
  }],
  attempts: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    answers: [Number],
    score: Number,
    percentage: Number,
    attemptedAt: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Test', testSchema);
