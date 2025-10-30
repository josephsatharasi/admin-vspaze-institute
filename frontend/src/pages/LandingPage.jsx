import React from 'react';
import { GraduationCap, Users, BookOpen, Calendar, BarChart3, Shield, Clock, Award } from 'lucide-react';

const LandingPage = ({ onLogin }) => {
  const features = [
    { icon: Users, title: 'Student Management', desc: 'Complete student lifecycle management with enrollment tracking' },
    { icon: GraduationCap, title: 'Faculty Management', desc: 'Manage faculty profiles, assignments, and performance' },
    { icon: BookOpen, title: 'Course Management', desc: 'Create and organize courses with detailed curriculum' },
    { icon: Calendar, title: 'Batch Management', desc: 'Organize students into batches with progress tracking' },
    { icon: BarChart3, title: 'Analytics & Reports', desc: 'Comprehensive reports and data visualization' },
    { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VSPaze Institute</h1>
              <p className="text-xs text-gray-500">Admin Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onLogin} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Complete Institute Management Solution
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Streamline your educational institute operations with our comprehensive admin dashboard. 
          Manage students, faculty, courses, and more - all in one place.
        </p>
        <div className="flex items-center justify-center">
          <button onClick={onLogin} className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg">
            Admin Login
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Powerful Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-blue-100">Support Available</p>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-blue-100">Students Managed</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="text-4xl font-bold mb-2">99.9%</p>
              <p className="text-blue-100">Uptime</p>
            </div>
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-blue-100">Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2024 VSPaze Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
