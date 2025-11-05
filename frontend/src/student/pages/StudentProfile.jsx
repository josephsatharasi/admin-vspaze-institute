import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, BookOpen, Calendar } from 'lucide-react';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
  }, []);

  if (!studentData) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {studentData.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{studentData.name}</h3>
            <p className="text-gray-600">Student ID: {studentData.id}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {studentData.status || 'Active'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{studentData.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{studentData.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Join Date</p>
              <p className="font-medium text-gray-900">{studentData.joinDate || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
              <p className="font-medium text-gray-900">{studentData.enrolledCourses?.length || 1}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
        <div className="space-y-3">
          {studentData.enrolledCourses?.map((course, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-gray-900">{course}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
