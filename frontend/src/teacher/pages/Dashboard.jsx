import React, { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, ClipboardList, TrendingUp, Calendar } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({ courses: 0, students: 0, assignments: 0, tests: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchCourses();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/faculty/dashboard');
      setStats(response.data.stats);
      setRecentActivities(response.data.recentActivities || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setStats({ courses: 0, students: 0, assignments: 0, tests: 0 });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/faculty/courses');
      setAssignedCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const statsCards = [
    { title: 'My Courses', value: stats?.courses || 0, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Total Students', value: stats?.students || 0, icon: Users, color: 'bg-green-500' },
    { title: 'Assignments', value: stats?.assignments || 0, icon: FileText, color: 'bg-purple-500' },
    { title: 'Tests', value: stats?.tests || 0, icon: ClipboardList, color: 'bg-orange-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            My Assigned Courses
          </h3>
          <div className="space-y-3">
            {assignedCourses.length > 0 ? (
              assignedCourses.map((course, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{course.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{course.duration} • {course.level}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No courses assigned yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button onClick={() => onNavigate?.('courses')} className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all font-semibold text-left flex items-center gap-3 shadow-sm hover:shadow-md">
              <BookOpen className="w-5 h-5" />
              <span>View My Courses</span>
            </button>
            <button onClick={() => onNavigate?.('assignments')} className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all font-semibold text-left flex items-center gap-3 shadow-sm hover:shadow-md">
              <FileText className="w-5 h-5" />
              <span>Create New Assignment</span>
            </button>
            <button onClick={() => onNavigate?.('tests')} className="w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all font-semibold text-left flex items-center gap-3 shadow-sm hover:shadow-md">
              <ClipboardList className="w-5 h-5" />
              <span>Create New Test</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
