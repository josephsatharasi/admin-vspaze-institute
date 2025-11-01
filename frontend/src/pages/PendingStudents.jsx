import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Eye, Lock } from 'lucide-react';
import { initializePendingStudents } from '../utils/initializePendingStudents';

const PendingStudents = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [password, setPassword] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  useEffect(() => {
    initializePendingStudents();
    loadPendingStudents();
  }, []);

  const loadPendingStudents = () => {
    const pending = JSON.parse(localStorage.getItem('pending_students') || '[]');
    setPendingStudents(pending);
  };

  const handleApproveClick = (student) => {
    setSelectedStudent(student);
    setShowPasswordModal(true);
    setPassword('');
  };

  const handleApprove = () => {
    if (!password.trim()) {
      alert('Please enter a password for the student');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Remove from pending
    const updatedPending = pendingStudents.filter(s => s.id !== selectedStudent.id);
    localStorage.setItem('pending_students', JSON.stringify(updatedPending));

    // Add to approved students with generated ID
    const students = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const newStudent = {
      ...selectedStudent,
      password,
      status: 'Active',
      enrolledCourses: [selectedStudent.course],
      totalFee: 0,
      paidAmount: 0,
      dueAmount: 0,
      joinDate: new Date().toISOString().split('T')[0],
      enrollmentType: 'individual'
    };
    students.push(newStudent);
    localStorage.setItem('approved_students', JSON.stringify(students));

    setPendingStudents(updatedPending);
    setShowPasswordModal(false);
    setSelectedStudent(null);
    alert(`${selectedStudent.name} has been approved and added to the institute!`);
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this registration?')) {
      const updated = pendingStudents.filter(s => s.id !== id);
      localStorage.setItem('pending_students', JSON.stringify(updated));
      setPendingStudents(updated);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">New Student Registrations</h2>
          <p className="text-gray-600 mt-1">Review and approve pending student registrations</p>
        </div>
        {pendingStudents.length > 0 && (
          <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
            {pendingStudents.length} Pending
          </span>
        )}
      </div>

      {pendingStudents.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Registrations</h3>
          <p className="text-gray-600">All student registrations have been processed</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingStudents.map((student) => (
            <div key={student.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                    <p className="text-gray-600">{student.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>📞 {student.phone}</span>
                      <span>📚 {student.course}</span>
                      <span>📅 {new Date(student.registeredAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setViewStudent(student);
                      setShowDetailModal(true);
                    }}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleApproveClick(student)}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(student.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Set Student Password</h3>
              <button onClick={() => setShowPasswordModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Approving: <span className="font-bold">{selectedStudent.name}</span></p>
                <p className="text-sm text-gray-600">Please set a password for this student to access the system</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Enter password (min 6 characters)"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
                >
                  Approve & Add Student
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && viewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {viewStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{viewStudent.name}</h4>
                  <p className="text-gray-600">{viewStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card bg-blue-50">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{viewStudent.phone}</p>
                </div>
                <div className="card bg-blue-50">
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="text-lg font-semibold text-gray-900">{viewStudent.course}</p>
                </div>
                <div className="card bg-blue-50">
                  <p className="text-sm text-gray-600">Batch Preference</p>
                  <p className="text-lg font-semibold text-gray-900">{viewStudent.batch || 'Not specified'}</p>
                </div>
                <div className="card bg-blue-50">
                  <p className="text-sm text-gray-600">Registered On</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(viewStudent.registeredAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {viewStudent.address && (
                <div className="card bg-gray-50">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-gray-900">{viewStudent.address}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleApproveClick(viewStudent);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingStudents;
