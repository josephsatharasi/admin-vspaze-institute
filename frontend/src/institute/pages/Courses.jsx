import React, { useState } from 'react';
import { BookOpen, Clock, DollarSign, Users, CheckCircle, ArrowRight, Code, Database, Megaphone, Cloud, Palette } from 'lucide-react';
import { courses } from '../data/courses';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Data Science', 'Marketing', 'Design', 'Cloud'];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            100% Online Courses - Learn from anywhere, anytime with live classes
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {course.iconType === 'code' && <Code className="w-10 h-10 text-white" />}
                    {course.iconType === 'database' && <Database className="w-10 h-10 text-white" />}
                    {course.iconType === 'megaphone' && <Megaphone className="w-10 h-10 text-white" />}
                    {course.iconType === 'cloud' && <Cloud className="w-10 h-10 text-white" />}
                    {course.iconType === 'palette' && <Palette className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{course.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                      <span className="font-bold text-green-600">{course.fee}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                    <div className="space-y-1">
                      {course.syllabus.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/student-registration"
                    className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">Contact us for customized online training programs</p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Courses;
