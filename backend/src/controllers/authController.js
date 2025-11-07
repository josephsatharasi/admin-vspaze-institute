const Admin = require('../models/admin/Admin');
const Student = require('../models/student/Student');
const Faculty = require('../models/faculty/Faculty');
const { generateToken } = require('../utils/jwt');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id, admin.role);
    res.json({
      success: true,
      token,
      user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student Login
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).select('+password');
    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (student.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account not active' });
    }

    student.lastLogin = new Date();
    await student.save();

    const token = generateToken(student._id, 'student');
    res.json({
      success: true,
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        enrolledCourses: student.enrolledCourses,
        dueAmount: student.dueAmount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student Registration (Public)
exports.studentRegister = async (req, res) => {
  try {
    const { name, email, phone, course, address } = req.body;

    const exists = await Student.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      address,
      password: 'temp123',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted. Admin will approve soon.',
      studentId: student._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Faculty Login
exports.facultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email }).select('+password');
    if (!faculty) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (faculty.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Your account is pending approval. Please contact admin.' });
    }

    if (!(await faculty.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    faculty.lastLogin = new Date();
    await faculty.save();

    const token = generateToken(faculty._id, 'faculty');
    res.json({
      success: true,
      token,
      user: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        phone: faculty.phone,
        specialization: faculty.specialization,
        experience: faculty.experience
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Faculty Registration (Public)
exports.facultyRegister = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, qualification, bio, resume } = req.body;

    const exists = await Faculty.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const faculty = await Faculty.create({
      name,
      email,
      phone,
      specialization,
      experience,
      qualification,
      bio,
      resume,
      password: 'teacher123',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted. Admin will review soon.',
      facultyId: faculty._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
