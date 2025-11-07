const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, default: 100 },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    marks: Number
  }],
  attempts: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    attemptedAt: Date,
    answers: [String],
    score: Number
  }]
}, { timestamps: true });

module.exports = mongoose.models.Test || mongoose.model('Test', testSchema);
