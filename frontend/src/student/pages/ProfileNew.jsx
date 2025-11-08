import React, { useState, useEffect } from 'react';
import { Settings, Phone, MessageSquare, Mail, GraduationCap, BarChart3, Download, BookMarked, Package, Bell, HelpCircle, ChevronRight, Menu } from 'lucide-react';

const ProfileNew = ({ onMenuClick }) => {
  const [studentData, setStudentData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
  }, []);

  const profileSections = [
    { id: 'certificates', label: 'My Certificates', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'notes', label: 'Notes & Bookmarks', icon: BookMarked },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  if (selectedSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedSection(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                {profileSections.find(s => s.id === selectedSection)?.label}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-600 text-center">Content for {selectedSection} will be displayed here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-indigo-600 font-bold text-3xl">
              {studentData?.name?.charAt(0) || 'S'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{studentData?.name || 'Student Name'}</h2>
          <p className="text-gray-600 mb-6">{studentData?.email || 'student@example.com'}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Badges</p>
            </div>
          </div>
        </div>

        {/* Contact VSPAZE Teachers */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Contact VSPAZE Teachers</h3>
              <p className="text-sm text-indigo-100">Have doubts? Need urgent help? Contact our teachers directly!</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 transition flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Call Teacher</p>
                  <p className="text-sm text-indigo-100">+91 9876543210</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 transition flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">WhatsApp Support</p>
                  <p className="text-sm text-indigo-100">Chat on WhatsApp</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 transition flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-indigo-100">support@vspaze.com</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-3">
          {profileSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="w-full bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-900">{section.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileNew;
