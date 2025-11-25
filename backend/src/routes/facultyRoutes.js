const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Assignment = require('../models/assignment/Assignment');
const Test = require('../models/test/Test');
const Faculty = require('../models/faculty/Faculty');
const Student = require('../models/student/Student');

// Dashboard
router.get('/dashboard', protect(['faculty']), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id).populate('assignedCourses');
    const assignments = await Assignment.countDocuments({ faculty: req.user.id });
    const tests = await Test.countDocuments({ faculty: req.user.id });
    
    res.json({
      success: true,
      stats: {
        courses: faculty.assignedCourses?.length || 0,
        students: 0,
        assignments,
        tests
      },
      recentActivities: []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Profile
router.get('/profile', protect(['faculty']), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id).select('-password');
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Courses
router.get('/courses', protect(['faculty']), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id).populate('assignedCourses');
    res.json({ success: true, courses: faculty.assignedCourses || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ASSIGNMENTS CRUD
router.get('/assignments', protect(['faculty']), async (req, res) => {
  try {
    const assignments = await Assignment.find({ faculty: req.user.id }).populate('course').sort('-createdAt');
    res.json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/assignments', protect(['faculty']), async (req, res) => {
  try {
    const assignment = await Assignment.create({ ...req.body, faculty: req.user.id });
    res.json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/assignments/:id', protect(['faculty']), async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, faculty: req.user.id },
      req.body,
      { new: true }
    );
    res.json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/assignments/:id', protect(['faculty']), async (req, res) => {
  try {
    await Assignment.findOneAndDelete({ _id: req.params.id, faculty: req.user.id });
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// TESTS CRUD
router.get('/tests', protect(['faculty']), async (req, res) => {
  try {
    const tests = await Test.find({ faculty: req.user.id }).populate('course').sort('-createdAt');
    res.json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/tests', protect(['faculty']), async (req, res) => {
  try {
    const test = await Test.create({ ...req.body, faculty: req.user.id });
    res.json({ success: true, test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/tests/:id', protect(['faculty']), async (req, res) => {
  try {
    const test = await Test.findOneAndUpdate(
      { _id: req.params.id, faculty: req.user.id },
      req.body,
      { new: true }
    );
    res.json({ success: true, test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/tests/:id', protect(['faculty']), async (req, res) => {
  try {
    await Test.findOneAndDelete({ _id: req.params.id, faculty: req.user.id });
    res.json({ success: true, message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Students
router.get('/students', protect(['faculty']), async (req, res) => {
  try {
    const students = await Student.find({ status: 'active' }).select('-password');
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Schedule
router.get('/schedule', protect(['faculty']), async (req, res) => {
  try {
    res.json({ success: true, schedule: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
