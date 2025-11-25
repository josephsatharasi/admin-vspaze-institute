import React, { useState, useEffect } from 'react';
import { Play, Lock, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import api from '../../utils/api';

const CourseContent = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/student/profile');
      const student = response.data.student;
      setStudentData(student);
      setIsPaid(student?.dueAmount === 0);
      
      if (student?.enrolledCourses?.length > 0) {
        setCourses(student.enrolledCourses);
        const firstCourse = student.enrolledCourses[0];
        const courseId = firstCourse._id || firstCourse;
        setSelectedCourse(courseId);
        await fetchCourseData(courseId);
      } else {
        setCourseData({ syllabus: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCourseData({ syllabus: [] });
    }
  };

  const fetchCourseData = async (courseId) => {
    try {
      const courseRes = await api.get(`/courses/${courseId}`);
      setCourseData(courseRes.data.course);
      if (courseRes.data.course.videos?.length > 0 && !selectedVideo) {
        setExpandedModules({ 1: true });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourseData({ syllabus: [], videos: [] });
    }
  };

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);
    setSelectedVideo(null);
    await fetchCourseData(courseId);
  };

  const videosByModule = {};
  courseData?.videos?.forEach(video => {
    if (!videosByModule[video.module]) {
      videosByModule[video.module] = [];
    }
    videosByModule[video.module].push(video);
  });

  const courseModules = Object.keys(videosByModule).map((moduleName, index) => ({
    id: index + 1,
    title: moduleName,
    topics: videosByModule[moduleName].map((video) => ({
      id: video._id,
      title: video.title,
      url: video.url,
      completed: false
    }))
  }));

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
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
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
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      {/* Course Selector */}
      {courses.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => handleCourseChange(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {courses.map((course) => (
              <option key={course._id || course} value={course._id || course}>
                {course.name || course}
              </option>
            ))}
          </select>
        </div>
      )}

      {courseModules.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-600 mb-4">No course content available yet.</p>
          <p className="text-sm text-gray-500">Course syllabus will be added soon by the instructor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 order-1 lg:order-1">
          {selectedVideo ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.url.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Mark as Complete
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
      )}
    </div>
  );
};

export default CourseContent;
