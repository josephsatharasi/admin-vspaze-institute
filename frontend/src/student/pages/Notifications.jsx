import React, { useState } from 'react';
import { ArrowLeft, Video, FileText, MessageCircle, Bell, CheckCheck } from 'lucide-react';

const Notifications = ({ onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'live',
      icon: Video,
      title: 'New Live Session',
      message: 'Flutter Advanced starts in 1 hour',
      time: '2h ago',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 2,
      type: 'assignment',
      icon: FileText,
      title: 'Assignment Graded',
      message: 'You scored 85% in Test 3',
      time: '2h ago',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      id: 3,
      type: 'doubt',
      icon: MessageCircle,
      title: 'Doubt Answered',
      message: 'Instructor replied to your doubt',
      time: '2h ago',
      color: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      id: 4,
      type: 'announcement',
      icon: Bell,
      title: 'Announcement',
      message: 'New course materials available',
      time: '2h ago',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      read: false
    },
    {
      id: 5,
      type: 'live',
      icon: Video,
      title: 'New Live Session',
      message: 'React Advanced starts tomorrow',
      time: '5h ago',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      read: false
    },
    {
      id: 6,
      type: 'assignment',
      icon: FileText,
      title: 'New Assignment',
      message: 'Complete the Node.js assignment',
      time: '1d ago',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            </div>
            <button 
              onClick={markAllRead}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        {unreadCount > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-indigo-700">
              You have <span className="font-bold">{unreadCount}</span> unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
                  !notification.read ? 'border-l-4 border-indigo-600' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${notification.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
