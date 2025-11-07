import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar } from 'lucide-react';
import api from '../../utils/api';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/faculty/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No courses assigned yet</p>
          <p className="text-sm text-gray-500 mt-2">Contact admin to get courses assigned</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.description?.substring(0, 100)}...</p>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {course.enrolledStudents || 0} students
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {course.duration}
              </span>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
