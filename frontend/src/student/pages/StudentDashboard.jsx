import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';
import api from '../../utils/api';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await api.get('/student/profile');
      const student = response.data.student;
      setStudentData(student);
      setIsPaid(student?.dueAmount === 0);
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Fallback to localStorage
      const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
      if (auth.student) {
        setStudentData(auth.student);
        setIsPaid(auth.student?.dueAmount === 0);
      }
    }
  };

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Enrolled Courses', value: studentData.enrolledCourses?.length || 1, icon: BookOpen, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Attendance', value: isPaid ? '85%' : 'Locked', icon: Calendar, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
    { title: 'Completed', value: isPaid ? '12' : 'Locked', icon: CheckCircle, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Pending', value: isPaid ? '5' : 'Locked', icon: Clock, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="text-blue-600">{studentData.name}</span>!
              </h1>
              <p className="text-gray-600 text-base sm:text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Keep up the great work!
              </p>
            </div>
            {isPaid && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Active Student</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Alert */}
        {!isPaid && (
          <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-l-4 border-orange-500 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Complete Payment to Unlock Full Access</h3>
                <p className="text-gray-700 text-sm sm:text-base">Pay <span className="font-bold text-orange-600">₹{studentData.dueAmount}</span> to access all course materials, assignments, and features</p>
              </div>
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md">
                Pay Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-100 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {!isPaid && stat.value === 'Locked' && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">🔒</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* My Courses - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                My Courses
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {studentData.enrolledCourses?.length || 0} Active
              </span>
            </div>
            <div className="space-y-4">
              {studentData.enrolledCourses?.map((course, index) => (
                <div key={index} className="group p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{course.name || course}</h4>
                    {isPaid && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                    )}
                  </div>
                  {isPaid ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <span className="font-medium">Progress</span>
                        <span className="font-bold text-blue-600">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                        <span>13/20 lessons completed</span>
                        <span>7 lessons remaining</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
                      <span className="text-lg">🔒</span>
                      <span>Complete payment to start learning</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-purple-600" />
              Recent Activity
            </h3>
            <div className="space-y-5">
              {[
                { title: 'Assignment submitted', time: '2 hours ago', color: 'bg-green-500', icon: '✓' },
                { title: 'Attended class', time: '1 day ago', color: 'bg-blue-500', icon: '📚' },
                { title: 'Quiz completed', time: '3 days ago', color: 'bg-purple-500', icon: '🎯' },
                { title: 'Course enrolled', time: '1 week ago', color: 'bg-orange-500', icon: '🎓' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`flex-shrink-0 w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
