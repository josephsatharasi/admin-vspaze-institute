require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./src/models/faculty/Faculty');

const activateTeacher = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = process.argv[2];
    if (!email) {
      console.log('\n❌ Please provide teacher email');
      console.log('Usage: node activate-teacher.js <email>');
      process.exit(1);
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      console.log(`\n❌ Teacher not found: ${email}`);
      process.exit(1);
    }

    faculty.status = 'active';
    await faculty.save();

    console.log(`\n✅ Activated teacher: ${faculty.email}`);
    console.log(`   Name: ${faculty.name}`);
    console.log(`   Status: ${faculty.status}`);
    console.log(`   Login with password: teacher123`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

activateTeacher();
