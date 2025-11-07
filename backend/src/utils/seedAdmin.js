require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/admin/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@vspaze.com' });
    
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@vspaze.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create superadmin
    const superadminExists = await Admin.findOne({ email: 'superadmin@vspaze.com' });
    
    if (!superadminExists) {
      await Admin.create({
        name: 'Super Admin',
        email: 'superadmin@vspaze.com',
        password: 'super123',
        role: 'superadmin'
      });
      console.log('✅ Superadmin user created');
    } else {
      console.log('ℹ️  Superadmin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
