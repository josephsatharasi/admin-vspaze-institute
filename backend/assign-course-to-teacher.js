require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./src/models/faculty/Faculty');
const Course = require('./src/models/course/Course');

const assignCourse = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get teacher
    const teacher = await Faculty.findOne({ email: 'teacher@test.com' });
    if (!teacher) {
      console.log('❌ Teacher not found');
      process.exit(1);
    }

    // Get all courses
    const courses = await Course.find();
    console.log(`\n📚 Found ${courses.length} courses`);

    if (courses.length === 0) {
      console.log('❌ No courses found. Please add courses first.');
      process.exit(1);
    }

    // Assign first 2 courses to teacher
    const coursesToAssign = courses.slice(0, 2).map(c => c._id);
    teacher.assignedCourses = coursesToAssign;
    await teacher.save();

    console.log(`\n✅ Assigned ${coursesToAssign.length} courses to ${teacher.name}`);
    courses.slice(0, 2).forEach(c => {
      console.log(`   - ${c.name}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

assignCourse();
