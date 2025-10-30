import React from 'react';
import { Home, Users, GraduationCap, BookOpen, Calendar, CreditCard, ClipboardCheck, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'batches', label: 'Batches', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'payments', label: 'Payments', icon: CreditCard }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-blue-50 shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">VSPaze</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
