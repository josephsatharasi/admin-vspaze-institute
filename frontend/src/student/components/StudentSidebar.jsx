import React, { useState } from 'react';
import { Home, BookOpen, Calendar, FileText, User, CreditCard, FileCheck, X, ChevronDown, ChevronUp, Code, Briefcase, Gamepad2 } from 'lucide-react';

const StudentSidebar = ({ isOpen, onClose, activeSection, setActiveSection }) => {
  const [activitiesOpen, setActivitiesOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Course Content', icon: BookOpen },
    { id: 'practice', label: 'Live Coding', icon: Code },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const activityItems = [
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'tests', label: 'Tests', icon: FileCheck },
    { id: 'activities', label: 'Game Zone', icon: Gamepad2 }
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Student</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}

          {/* Activities Dropdown */}
          <div>
            <button
              onClick={() => setActivitiesOpen(!activitiesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileCheck className="w-5 h-5" />
                <span className="font-medium">Activities</span>
              </div>
              {activitiesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {activitiesOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {activityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default StudentSidebar;
