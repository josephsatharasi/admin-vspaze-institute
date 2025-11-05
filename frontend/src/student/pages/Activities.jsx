import React, { useState } from 'react';
import { FileText, HelpCircle, Zap, ChevronRight, Menu } from 'lucide-react';

const Activities = ({ onMenuClick }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      id: 'assignments',
      title: 'Assignments',
      icon: FileText,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      count: 5,
      items: [
        { id: 1, title: 'React Hooks Assignment', dueDate: '25 Oct 2024', status: 'pending' },
        { id: 2, title: 'State Management Task', dueDate: '28 Oct 2024', status: 'submitted' },
        { id: 3, title: 'API Integration Project', dueDate: '30 Oct 2024', status: 'pending' }
      ]
    },
    {
      id: 'tests',
      title: 'Tests',
      icon: HelpCircle,
      color: 'bg-teal-100',
      iconColor: 'text-teal-600',
      count: 3,
      items: [
        { id: 1, title: 'JavaScript Fundamentals Test', dueDate: '26 Oct 2024', status: 'completed', score: '85%' },
        { id: 2, title: 'React Components Quiz', dueDate: '29 Oct 2024', status: 'pending' },
        { id: 3, title: 'Final Assessment', dueDate: '31 Oct 2024', status: 'upcoming' }
      ]
    },
    {
      id: 'quizzes',
      title: 'Quick Quizzes',
      icon: Zap,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      count: 8,
      items: [
        { id: 1, title: 'Daily Quiz - Day 1', status: 'completed', score: '90%' },
        { id: 2, title: 'Daily Quiz - Day 2', status: 'completed', score: '75%' },
        { id: 3, title: 'Daily Quiz - Day 3', status: 'available' }
      ]
    }
  ];

  if (selectedActivity) {
    const activity = activities.find(a => a.id === selectedActivity);
    const Icon = activity.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">{activity.title}</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
          {activity.items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  {item.dueDate && (
                    <p className="text-sm text-gray-600 mb-2">Due: {item.dueDate}</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.status === 'completed' || item.status === 'submitted'
                        ? 'bg-green-100 text-green-600'
                        : item.status === 'pending' || item.status === 'available'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    {item.score && (
                      <span className="text-sm font-medium text-gray-700">Score: {item.score}</span>
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          </div>
          <p className="text-sm text-gray-600">Track your assignments, tests, and quizzes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <button
              key={activity.id}
              onClick={() => setSelectedActivity(activity.id)}
              className="w-full bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.count} items</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
