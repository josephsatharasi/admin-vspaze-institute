import React, { useState, useEffect } from 'react';
import { Play, Lock, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import api from '../../utils/api';

const CourseContent = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/student/profile');
      const student = response.data.student;
      console.log('Student data:', student);
      setStudentData(student);
      setIsPaid(student?.dueAmount === 0);
      
      if (student?.enrolledCourses?.[0]) {
        const courseId = student.enrolledCourses[0]._id || student.enrolledCourses[0];
        console.log('Fetching course:', courseId);
        const courseRes = await api.get(`/courses/${courseId}`);
        console.log('Course data:', courseRes.data.course);
        setCourseData(courseRes.data.course);
      } else {
        console.log('No enrolled courses found');
        setCourseData({ syllabus: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCourseData({ syllabus: [] });
    }
  };

  const courseModules = courseData?.syllabus?.map((module, index) => ({
    id: index + 1,
    title: module.module,
    duration: '2 hours',
    topics: module.topics?.map((topic, topicIndex) => ({
      id: `${index}-${topicIndex}`,
      title: topic,
      duration: '30 min',
      completed: false
    })) || []
  })) || [];

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleVideoClick = (topic) => {
    if (isPaid) {
      setSelectedVideo(topic);
    }
  };

  if (!studentData) {
    return <div className="text-center py-12">Loading student data...</div>;
  }

  if (!courseData) {
    return <div className="text-center py-12">Loading course data...</div>;
  }

  if (!isPaid) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-8 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Locked</h2>
          <p className="text-gray-700 mb-6">
            Please complete your payment to access the course content
          </p>
          <div className="bg-white rounded-lg p-4 mb-6 inline-block">
            <p className="text-sm text-gray-600">Pending Amount</p>
            <p className="text-3xl font-bold text-red-600">₹{studentData.dueAmount}</p>
          </div>
          <p className="text-gray-600 mb-4">Go to Payments section to complete your enrollment</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Preview</h3>
          <div className="space-y-4">
            {courseModules.length > 0 ? (
              courseModules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.topics.length} topics • {module.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No course content available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 order-1 lg:order-1">
          {selectedVideo ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-black aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm text-gray-400">Playing: {selectedVideo.title}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-600 mb-4">Duration: {selectedVideo.duration}</p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Mark as Complete
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Download Resources
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a topic to start learning</h3>
              <p className="text-gray-600">Choose any topic from the right sidebar to begin</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 order-2 lg:order-2 space-y-4">
          {courseModules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {expandedModules[module.id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.topics.length} topics</p>
                  </div>
                </div>
              </button>

              {expandedModules[module.id] && (
                <div className="border-t border-gray-100">
                  {module.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleVideoClick(topic)}
                      className={`w-full p-3 flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        selectedVideo?.id === topic.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {topic.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Play className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-sm text-gray-900">{topic.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{topic.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
