require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./src/models/faculty/Faculty');

const testTeacherLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if any faculty exists
    const faculties = await Faculty.find().select('+password');
    console.log(`\n📊 Total Faculty: ${faculties.length}`);

    if (faculties.length > 0) {
      console.log('\n👥 Faculty List:');
      faculties.forEach((f, i) => {
        console.log(`${i + 1}. Email: ${f.email}, Status: ${f.status}, Has Password: ${!!f.password}`);
      });

      // Test login with first active faculty
      const activeFaculty = faculties.find(f => f.status === 'active');
      if (activeFaculty) {
        console.log(`\n🔐 Testing login for: ${activeFaculty.email}`);
        const isMatch = await activeFaculty.comparePassword('teacher123');
        console.log(`Password 'teacher123' matches: ${isMatch}`);
      } else {
        console.log('\n⚠️  No active faculty found. Creating test account...');
        await createTestTeacher();
      }
    } else {
      console.log('\n⚠️  No faculty found. Creating test account...');
      await createTestTeacher();
    }

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const createTestTeacher = async () => {
  const testTeacher = await Faculty.create({
    name: 'Test Teacher',
    email: 'teacher@test.com',
    phone: '9876543210',
    specialization: 'Full Stack Development',
    experience: '5 years',
    qualification: 'M.Tech',
    bio: 'Test teacher account',
    password: 'teacher123',
    status: 'active'
  });
  console.log(`✅ Created test teacher: ${testTeacher.email}`);
  console.log(`   Password: teacher123`);
  console.log(`   Status: ${testTeacher.status}`);
};

testTeacherLogin();
