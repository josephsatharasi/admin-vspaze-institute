import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, Award } from 'lucide-react';
import api from '../../utils/api';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const profileRes = await api.get('/student/profile');
      const student = profileRes.data.student;
      setStudentData(student);
      const paid = student?.dueAmount === 0;
      setIsPaid(paid);

      if (paid) {
        try {
          const [assignmentsRes, testsRes] = await Promise.all([
            api.get('/student/assignments'),
            api.get('/student/tests')
          ]);
          setAssignments(assignmentsRes.data.assignments || []);
          setTests(testsRes.data.tests || []);
        } catch (err) {
          console.error('Error fetching assignments/tests:', err);
          setAssignments([]);
          setTests([]);
        }
      } else {
        setAssignments([]);
        setTests([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !studentData) {
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
    { title: 'Enrolled Courses', value: studentData.enrolledCourses?.length || 0, icon: BookOpen, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Assignments', value: isPaid ? assignments.length : 'Locked', icon: CheckCircle, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
    { title: 'Tests', value: isPaid ? tests.length : 'Locked', icon: Calendar, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Pending', value: isPaid ? assignments.filter(a => !a.submitted).length : 'Locked', icon: Clock, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' }
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
              <p className="text-gray-600 text-base sm:text-lg">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Assignments */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Assignments
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {isPaid ? assignments.length : '🔒'}
              </span>
            </div>
            {!isPaid ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-gray-600">Complete payment to view assignments</p>
              </div>
            ) : assignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No assignments yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assignments.slice(0, 5).map((assignment, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{assignment.title}</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">New</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{assignment.course?.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span>{assignment.totalMarks} marks</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tests */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                Tests
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {isPaid ? tests.length : '🔒'}
              </span>
            </div>
            {!isPaid ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-gray-600">Complete payment to view tests</p>
              </div>
            ) : tests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tests yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {tests.slice(0, 5).map((test, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{test.title}</h4>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">New</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{test.course?.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Date: {new Date(test.date).toLocaleDateString()}</span>
                      <span>{test.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
