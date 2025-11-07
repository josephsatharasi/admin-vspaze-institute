const Course = require('../models/course/Course');

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const Student = require('../models/student/Student');
    const Batch = require('../models/batch/Batch');
    
    const courses = await Course.find();
    
    // Calculate enrolled students and batches for each course
    const coursesWithStats = await Promise.all(courses.map(async (course) => {
      const enrolledCount = await Student.countDocuments({ 
        enrolledCourses: course._id,
        status: 'active'
      });
      const batchCount = await Batch.countDocuments({ 
        course: course._id,
        status: 'active'
      });
      
      return {
        ...course.toObject(),
        enrolledStudents: enrolledCount,
        batches: batchCount
      };
    }));
    
    res.json({ success: true, courses: coursesWithStats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Course (Admin)
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Course (Admin)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Course (Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
