require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/course/Course');

const sampleCourses = [
  {
    name: 'Full Stack Development',
    description: 'Master modern web development with React, Node.js, and MongoDB. Build production-ready applications from scratch.',
    duration: '6 months',
    fee: 50000,
    subjects: ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git & GitHub'],
    syllabus: [
      { module: 'Frontend Basics', topics: ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap'] },
      { module: 'JavaScript', topics: ['ES6+', 'DOM Manipulation', 'Async Programming', 'APIs'] },
      { module: 'React', topics: ['Components', 'Hooks', 'State Management', 'Redux'] },
      { module: 'Backend', topics: ['Node.js', 'Express', 'MongoDB', 'Authentication'] }
    ],
    status: 'active'
  },
  {
    name: 'Data Science & AI',
    description: 'Learn data analysis, machine learning, and artificial intelligence with Python. Work on real-world projects.',
    duration: '8 months',
    fee: 60000,
    subjects: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Visualization'],
    syllabus: [
      { module: 'Python Basics', topics: ['Syntax', 'Data Structures', 'OOP', 'Libraries'] },
      { module: 'Data Analysis', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'] },
      { module: 'Machine Learning', topics: ['Algorithms', 'Scikit-learn', 'Model Training'] },
      { module: 'Deep Learning', topics: ['Neural Networks', 'TensorFlow', 'Keras'] }
    ],
    status: 'active'
  },
  {
    name: 'Digital Marketing',
    description: 'Master online marketing strategies including SEO, social media, content marketing, and paid advertising.',
    duration: '4 months',
    fee: 35000,
    subjects: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Analytics'],
    syllabus: [
      { module: 'SEO', topics: ['On-page SEO', 'Off-page SEO', 'Keyword Research', 'Link Building'] },
      { module: 'Social Media', topics: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'] },
      { module: 'Paid Ads', topics: ['Google Ads', 'Facebook Ads', 'Campaign Management'] },
      { module: 'Analytics', topics: ['Google Analytics', 'Data Analysis', 'Reporting'] }
    ],
    status: 'active'
  },
  {
    name: 'Cloud Computing (AWS)',
    description: 'Learn cloud infrastructure, deployment, and DevOps practices with Amazon Web Services.',
    duration: '5 months',
    fee: 45000,
    subjects: ['AWS Basics', 'EC2', 'S3', 'Lambda', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
    syllabus: [
      { module: 'AWS Fundamentals', topics: ['IAM', 'EC2', 'S3', 'VPC'] },
      { module: 'Containers', topics: ['Docker', 'Kubernetes', 'ECS', 'EKS'] },
      { module: 'DevOps', topics: ['CI/CD', 'Jenkins', 'GitLab', 'Terraform'] },
      { module: 'Serverless', topics: ['Lambda', 'API Gateway', 'DynamoDB'] }
    ],
    status: 'active'
  },
  {
    name: 'UI/UX Design',
    description: 'Create beautiful and user-friendly interfaces. Learn design principles, Figma, and prototyping.',
    duration: '4 months',
    fee: 40000,
    subjects: ['Design Principles', 'Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
    syllabus: [
      { module: 'Design Basics', topics: ['Color Theory', 'Typography', 'Layout', 'Composition'] },
      { module: 'Tools', topics: ['Figma', 'Adobe XD', 'Sketch', 'InVision'] },
      { module: 'UX Research', topics: ['User Personas', 'User Journey', 'Testing'] },
      { module: 'Prototyping', topics: ['Wireframes', 'Mockups', 'Interactive Prototypes'] }
    ],
    status: 'active'
  },
  {
    name: 'Python Programming',
    description: 'Master Python from basics to advanced. Perfect for beginners and aspiring developers.',
    duration: '3 months',
    fee: 25000,
    subjects: ['Python Basics', 'OOP', 'Data Structures', 'File Handling', 'APIs', 'Web Scraping'],
    syllabus: [
      { module: 'Fundamentals', topics: ['Syntax', 'Variables', 'Data Types', 'Control Flow'] },
      { module: 'OOP', topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'] },
      { module: 'Advanced', topics: ['Decorators', 'Generators', 'Context Managers'] },
      { module: 'Projects', topics: ['Web Scraping', 'APIs', 'Automation'] }
    ],
    status: 'active'
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`✅ ${courses.length} courses created successfully`);

    courses.forEach(course => {
      console.log(`   - ${course.name} (₹${course.fee})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedCourses();
