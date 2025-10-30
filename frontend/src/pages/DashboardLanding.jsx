import React from 'react';
import StatCard from '../components/StatCard';
import BatchCard from '../components/BatchCard';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Award,
  DollarSign
} from 'lucide-react';

const DashboardLanding = ({ onBatchClick, onCourseClick, onFacultyClick }) => {
  const stats = [
    { title: 'Total Students', value: '2,847', change: '+12.5%', icon: Users, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600', bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100', trend: 'up' },
    { title: 'Faculty Members', value: '156', change: '+3.2%', icon: GraduationCap, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100', trend: 'up' },
    { title: 'Active Courses', value: '42', change: '+8.1%', icon: BookOpen, color: 'bg-gradient-to-br from-violet-500 to-violet-600', bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100', trend: 'up' },
    { title: 'Active Batches', value: '18', change: '+5.2%', icon: Calendar, color: 'bg-gradient-to-br from-amber-500 to-amber-600', bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100', trend: 'up' }
  ];

  const batches = [
    { name: 'FSD-2024-A', course: 'Full Stack Development', students: 45, faculty: 3, duration: '6 months', progress: 65, status: 'Active', subjects: ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'] },
    { name: 'DSAI-2024-B', course: 'Data Science & AI', students: 38, faculty: 2, duration: '8 months', progress: 42, status: 'Active', subjects: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Visualization'] },
    { name: 'DM-2024-C', course: 'Digital Marketing', students: 52, faculty: 2, duration: '4 months', progress: 78, status: 'Active', subjects: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Analytics'] },
    { name: 'CC-2024-D', course: 'Cloud Computing', students: 41, faculty: 3, duration: '6 months', progress: 55, status: 'Active', subjects: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Cloud Security'] },
    { name: 'CS-2024-E', course: 'Cyber Security', students: 35, faculty: 2, duration: '7 months', progress: 30, status: 'Active', subjects: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Penetration Testing', 'Security Tools', 'Incident Response'] },
    { name: 'MAD-2024-F', course: 'Mobile App Development', students: 48, faculty: 3, duration: '5 months', progress: 88, status: 'Active', subjects: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Firebase', 'App Deployment'] }
  ];

  const topCourses = [
    { name: 'Full Stack Development', students: 245, batches: 5, rating: 4.8, revenue: '$45,000' },
    { name: 'Data Science & AI', students: 198, batches: 4, rating: 4.9, revenue: '$52,000' },
    { name: 'Digital Marketing', students: 312, batches: 6, rating: 4.7, revenue: '$38,000' },
    { name: 'Cloud Computing', students: 176, batches: 3, rating: 4.6, revenue: '$41,000' }
  ];

  const topFaculty = [
    { name: 'Dr. Sarah Johnson', courses: 3, students: 145, rating: 4.9, specialization: 'Data Science' },
    { name: 'Prof. Michael Chen', courses: 2, students: 98, rating: 4.8, specialization: 'Web Development' },
    { name: 'Dr. Emily Davis', courses: 4, students: 187, rating: 4.7, specialization: 'Cloud Computing' },
    { name: 'Prof. James Wilson', courses: 2, students: 112, rating: 4.8, specialization: 'Cyber Security' }
  ];



  return (
    <div className="max-w-7xl mx-auto mt-4">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Institute Overview</h2>
          <p className="text-gray-600">Comprehensive view of batches, courses, students, and faculty</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Active Batches */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Batches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch, index) => (
              <div key={index} onClick={() => onBatchClick(batch)} className="cursor-pointer">
                <BatchCard batch={batch} />
              </div>
            ))}
          </div>
        </div>

        {/* Courses & Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Courses</h3>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} onClick={() => onCourseClick(course)} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{course.name}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{course.students}</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{course.batches}</span>
                        <span className="flex items-center"><Award className="w-4 h-4 mr-1" />{course.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">{course.revenue}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Faculty */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Faculty Members</h3>
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-4">
              {topFaculty.map((faculty, index) => (
                <div key={index} onClick={() => onFacultyClick(faculty)} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{faculty.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{faculty.name}</h4>
                        <p className="text-xs text-gray-600">{faculty.specialization}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-600">
                          <span>{faculty.courses} Courses</span>
                          <span>{faculty.students} Students</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{faculty.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default DashboardLanding;
