import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, Home, Info, BookOpen, Users, Award, Phone, UserPlus, Shield, DollarSign, CheckCircle, ChevronDown, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const InstituteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    {
      name: 'Academics',
      icon: BookOpen,
      dropdown: [
        { name: 'All Courses', path: '/courses', icon: BookOpen },
        { name: 'Faculty', path: '/faculty', icon: Users },
        { name: 'Certifications', path: '/certifications', icon: CheckCircle }
      ]
    },
    {
      name: 'Admissions',
      icon: DollarSign,
      dropdown: [
        { name: 'Fees & Payment', path: '/admissions', icon: DollarSign },
        { name: 'Apply Now', path: '/student-registration', icon: UserPlus }
      ]
    },
    { name: 'Success Stories', path: '/success-stories', icon: Award },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vspaze
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div key={idx} className="relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
                    className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen === idx && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.dropdown.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          onClick={() => setDropdownOpen(null)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              to="/student"
              onClick={() => {
                // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                localStorage.setItem('student_auth', JSON.stringify({
                  isAuthenticated: true,
                  student: { id: 'demo-student', name: 'Demo Student', email: 'demo@student.com', enrolledCourses: ['Full Stack Development'], dueAmount: 0 }
                }));
              }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Student Login
            </Link>
            <Link
              to="/teacher"
              onClick={() => {
                // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                localStorage.setItem('teacher_auth', JSON.stringify({
                  isAuthenticated: true,
                  teacher: { id: 'demo-teacher', name: 'Demo Teacher', email: 'demo@teacher.com', assignedCourses: ['Full Stack Development'] }
                }));
              }}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Teacher Login
            </Link>
            <Link
              to="/admin"
              onClick={() => {
                // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                localStorage.setItem('vspaze_auth', JSON.stringify({
                  isAuthenticated: true,
                  user: { id: 'demo-admin', name: 'Demo Admin', email: 'admin@vspaze.com', role: 'admin' }
                }));
                window.location.href = '/admin';
              }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Mobile Menu Sidebar */}
      {isOpen && (
        <div onClick={(e) => e.stopPropagation()} className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-white to-blue-50 shadow-xl z-50 transform transition-transform duration-300 md:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Vspaze Institute</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <nav className="p-4">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div key={idx} className="mb-2">
                  <div className="flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  <div className="ml-8 space-y-1">
                    {item.dropdown.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        to={subItem.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                          isActive(subItem.path)
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span className="text-sm">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            ))}
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <Link
                to="/student"
                onClick={() => {
                  // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                  localStorage.setItem('student_auth', JSON.stringify({
                    isAuthenticated: true,
                    student: { id: 'demo-student', name: 'Demo Student', email: 'demo@student.com', enrolledCourses: ['Full Stack Development'], dueAmount: 0 }
                  }));
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-100 transition-all"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Student Login</span>
              </Link>
              <Link
                to="/teacher"
                onClick={() => {
                  // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                  localStorage.setItem('teacher_auth', JSON.stringify({
                    isAuthenticated: true,
                    teacher: { id: 'demo-teacher', name: 'Demo Teacher', email: 'demo@teacher.com', assignedCourses: ['Full Stack Development'] }
                  }));
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-green-100 transition-all"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Teacher Login</span>
              </Link>
              <Link
                to="/admin"
                onClick={() => {
                  // ============ TEMPORARY: DIRECT LOGIN FOR CLIENT DEMO ============
                  localStorage.setItem('vspaze_auth', JSON.stringify({
                    isAuthenticated: true,
                    user: { id: 'demo-admin', name: 'Demo Admin', email: 'admin@vspaze.com', role: 'admin' }
                  }));
                  setIsOpen(false);
                  window.location.href = '/admin';
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-100 transition-all"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Login</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default InstituteNavbar;
