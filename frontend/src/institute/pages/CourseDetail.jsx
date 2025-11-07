import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, Users, Award, ChevronDown, ChevronUp, BookOpen, FileText, ClipboardList, Code } from 'lucide-react';
import api from '../../utils/api';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div className="text-2xl">Loading course...</div></div>;
  }

  if (!course) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div className="text-2xl">Course not found</div></div>;
  }

  const courseModules = course.syllabus || [];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-cyan-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-extrabold text-white mb-4">{course.name}</h1>
              <p className="text-xl text-cyan-100 mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 mr-2 text-cyan-300" />
                  <span className="text-white font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <DollarSign className="w-5 h-5 mr-2 text-cyan-300" />
                  <span className="text-white font-semibold">₹{course.fee?.toLocaleString()}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 mr-2 text-cyan-300" />
                  <span className="text-white font-semibold">{course.enrolledStudents || 0} Students</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 mr-2 text-cyan-300" />
                  <span className="text-white font-semibold">Certificate</span>
                </div>
              </div>
              <Link to="/student-registration" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                Enroll Now
              </Link>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" alt="Course" className="rounded-3xl shadow-2xl border border-cyan-500/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-extrabold text-white mb-8">Course Curriculum</h2>
            <div className="space-y-4">
              {courseModules.length > 0 ? courseModules.map((module, idx) => (
                <div key={idx} className="bg-slate-800 border border-cyan-500/20 rounded-2xl overflow-hidden">
                  <button onClick={() => setExpandedModule(expandedModule === idx ? null : idx)} className="w-full flex items-center justify-between p-6 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{idx + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{module.module}</h3>
                    </div>
                    {expandedModule === idx ? <ChevronUp className="w-6 h-6 text-cyan-400" /> : <ChevronDown className="w-6 h-6 text-cyan-400" />}
                  </button>
                  {expandedModule === idx && (
                    <div className="px-6 pb-6 border-t border-cyan-500/20">
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-cyan-400 font-semibold mb-3 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Topics Covered
                          </h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="text-cyan-100 flex items-center">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <div className="bg-slate-800 border border-cyan-500/20 rounded-2xl p-8 text-center">
                  <p className="text-cyan-100">Syllabus details coming soon...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-slate-800 border border-cyan-500/20 rounded-2xl p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
              <ul className="space-y-3 mb-6">
                {course.subjects && course.subjects.map((item, idx) => (
                  <li key={idx} className="flex items-start text-cyan-100">
                    <span className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-cyan-400 text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/student-registration" className="block text-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
