import React, { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, ClipboardList, TrendingUp, Calendar } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ courses: 0, students: 0, assignments: 0, tests: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/faculty/dashboard');
      setStats(response.data.stats);
      setRecentActivities(response.data.recentActivities || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      alert('Failed to load dashboard. Please check if you are logged in.');
    } finally {
      setLoading(false);
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
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activities</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-left">
              Create New Assignment
            </button>
            <button className="w-full p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-left">
              Create New Test
            </button>
            <button className="w-full p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition text-left">
              View Student Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
