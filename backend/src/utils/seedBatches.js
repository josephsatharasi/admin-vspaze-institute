require('dotenv').config();
const mongoose = require('mongoose');
const Batch = require('../models/batch/Batch');
const Course = require('../models/course/Course');
const Faculty = require('../models/faculty/Faculty');

const seedBatches = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get courses and faculty
    const courses = await Course.find({ status: 'active' }).limit(3);
    const faculty = await Faculty.find({ status: 'active' }).limit(3);

    if (courses.length === 0) {
      console.log('No courses found. Please seed courses first.');
      process.exit(1);
    }

    // Clear existing batches
    await Batch.deleteMany({});

    const batches = [
      {
        name: 'Batch A-2024',
        course: courses[0]._id,
        faculty: faculty[0]?._id,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-07-15'),
        schedule: 'Mon-Fri, 10:00 AM - 1:00 PM',
        maxStudents: 50,
        status: 'active'
      },
      {
        name: 'Batch B-2024',
        course: courses[1]?._id || courses[0]._id,
        faculty: faculty[1]?._id || faculty[0]?._id,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-10-01'),
        schedule: 'Mon-Fri, 2:00 PM - 5:00 PM',
        maxStudents: 40,
        status: 'active'
      },
      {
        name: 'Batch C-2024',
        course: courses[2]?._id || courses[0]._id,
        faculty: faculty[2]?._id || faculty[0]?._id,
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-05-20'),
        schedule: 'Sat-Sun, 9:00 AM - 12:00 PM',
        maxStudents: 60,
        status: 'active'
      }
    ];

    await Batch.insertMany(batches);
    console.log('✅ Batches seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedBatches();
