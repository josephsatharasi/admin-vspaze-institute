import React, { useState, useEffect } from 'react';
import { Play, Search, Bell, BookOpen, Video, HelpCircle, MessageCircle, TrendingUp, Flame, Trophy, Menu } from 'lucide-react';
import Notifications from './Notifications';
import api from '../../utils/api';

const Home = ({ onNavigate, onMenuClick, onNavigateToCourses }) => {
  const [studentData, setStudentData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await api.get('/student/profile');
      setStudentData(response.data.student);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const userCourse = studentData?.enrolledCourses?.[0]?.name || 'No Course Enrolled';

  if (showNotifications) {
    return <Notifications onBack={() => setShowNotifications(false)} />;
  }

  const quickActions = [
    { id: 'courses', label: 'Courses', icon: BookOpen, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    { id: 'live', label: 'Live', icon: Video, color: 'bg-purple-100', iconColor: 'text-purple-600' },
    { id: 'tests', label: 'Tests', icon: HelpCircle, color: 'bg-teal-100', iconColor: 'text-teal-600' },
    { id: 'doubts', label: 'Doubts', icon: MessageCircle, color: 'bg-amber-100', iconColor: 'text-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">
                  {studentData?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back!</p>
                <p className="text-lg font-bold text-gray-900">{studentData?.name || 'Student'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Continue Learning */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{userCourse}</h3>
            <p className="text-sm text-gray-600 mb-3">Module 3: State Management</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">45% Complete</span>
              <button 
                onClick={onNavigateToCourses}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Play className="w-5 h-5 text-white fill-white" />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Upcoming Live Sessions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Live Sessions</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  Today 10:00 AM
                </span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Join</button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Flutter Concepts</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">👤</span>
                <span>Instructor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.id} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mb-2 hover:scale-105 transition`}>
                  <Icon className={`w-8 h-8 ${action.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Your Progress */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
            <button className="text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">65%</p>
              <p className="text-sm text-gray-600">Overall</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12 days</p>
              <p className="text-sm text-gray-600">Streak</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Badges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
