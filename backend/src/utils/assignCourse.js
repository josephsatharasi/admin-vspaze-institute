require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('../models/student/Student');
const Course = require('../models/course/Course');

const assignCourseToStudent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the first active course
    const course = await Course.findOne({ status: 'active' });
    if (!course) {
      console.log('No active courses found');
      process.exit(1);
    }

    // Get all active students without enrolled courses
    const students = await Student.find({ 
      status: 'active',
      $or: [
        { enrolledCourses: { $exists: false } },
        { enrolledCourses: { $size: 0 } }
      ]
    });

    console.log(`Found ${students.length} students without courses`);

    for (const student of students) {
      student.enrolledCourses = [course._id];
      await student.save();
      console.log(`Assigned ${course.name} to ${student.name}`);
    }

    console.log('✅ Course assignment completed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

assignCourseToStudent();
