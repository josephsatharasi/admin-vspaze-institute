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
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Student</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-5 space-y-2 overflow-y-auto" style={{maxHeight: 'calc(100vh - 88px)'}}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-[1.02]'
                    : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}

          {/* Activities Dropdown */}
          <div className="mt-2">
            <button
              onClick={() => setActivitiesOpen(!activitiesOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:translate-x-1"
            >
              <div className="flex items-center space-x-4">
                <FileCheck className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">Activities</span>
              </div>
              {activitiesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {activitiesOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 pl-3">
                {activityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
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
