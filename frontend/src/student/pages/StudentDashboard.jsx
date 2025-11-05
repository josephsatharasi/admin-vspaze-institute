import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
    setIsPaid(student?.dueAmount === 0);
  }, []);

  if (!studentData) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const stats = [
    { title: 'Enrolled Courses', value: studentData.enrolledCourses?.length || 1, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { title: 'Attendance', value: isPaid ? '85%' : 'Locked', icon: Calendar, color: 'from-green-500 to-green-600' },
    { title: 'Completed', value: isPaid ? '12' : 'Locked', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
    { title: 'Pending', value: isPaid ? '5' : 'Locked', icon: Clock, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {studentData.name}!</h2>
        <p className="text-gray-600">Here's your learning progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {!isPaid && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Complete Payment to Unlock Course</h3>
              <p className="text-gray-600">Pay ₹{studentData.dueAmount} to access all course materials and features</p>
            </div>
            <Clock className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h3>
          <div className="space-y-4">
            {studentData.enrolledCourses?.map((course, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">{course}</h4>
                {isPaid ? (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">🔒 Complete payment to start learning</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Assignment submitted</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Attended class</p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Quiz completed</p>
                <p className="text-xs text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
