import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Clock } from 'lucide-react';
import { initializeDummyActivity } from '../utils/initializeDummyActivity';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const approved = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const defaultStudents = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', course: 'Full Stack Development', batch: 'Batch A-2024', status: 'Active', enrolledCourses: ['Full Stack Development', 'React Advanced'], totalFee: 45000, paidAmount: 30000, dueAmount: 15000, joinDate: '2024-01-15', address: '123 Main St, City', enrollmentType: 'batch' },
      { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '0987654321', course: 'Data Science', batch: 'Batch B-2024', status: 'Active', enrolledCourses: ['Data Science & AI', 'Python'], totalFee: 52000, paidAmount: 52000, dueAmount: 0, joinDate: '2024-02-01', address: '456 Oak Ave, Town', enrollmentType: 'batch' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '5551234567', course: 'Digital Marketing', batch: 'Individual', status: 'Active', enrolledCourses: ['Digital Marketing', 'SEO Basics', 'Social Media Marketing'], totalFee: 38000, paidAmount: 20000, dueAmount: 18000, joinDate: '2024-01-20', address: '789 Pine Rd, Village', enrollmentType: 'individual' }
    ];
    setStudents([...defaultStudents, ...approved]);
  };
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', batch: '', status: 'Active' });
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    initializeDummyActivity();
  }, []);

  const getStudentActivity = (studentId) => {
    const activities = JSON.parse(localStorage.getItem('login_activities') || '[]');
    return activities.filter(a => a.userId === `S${studentId.toString().padStart(3, '0')}` && a.userType === 'student');
  };

  const calculateTotalHours = (activities) => {
    let total = 0;
    activities.forEach(activity => {
      if (activity.duration && activity.duration !== 'Active') {
        const [hours, minutes] = activity.duration.replace('h', '').replace('m', '').split(' ');
        total += parseInt(hours) * 60 + parseInt(minutes);
      }
    });
    return `${Math.floor(total / 60)}h ${total % 60}m`;
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ name: '', email: '', phone: '', course: '', batch: '', status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(s => s.id !== id);
      setStudents(updatedStudents);
      
      // Save approved students
      const approved = updatedStudents.filter(s => s.id > 3);
      localStorage.setItem('approved_students', JSON.stringify(approved));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedStudents;
    if (editingStudent) {
      updatedStudents = students.map(s => s.id === editingStudent.id ? { ...formData, id: s.id } : s);
    } else {
      updatedStudents = [...students, { ...formData, id: Date.now() }];
    }
    setStudents(updatedStudents);
    
    // Save approved students
    const approved = updatedStudents.filter(s => s.id > 3);
    localStorage.setItem('approved_students', JSON.stringify(approved));
    setShowModal(false);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Batch</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedStudent(student); setShowDetailModal(true); }}>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.phone}</td>
                <td className="py-3 px-4">{student.course}</td>
                <td className="py-3 px-4">{student.batch}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setSelectedActivity({ student, activities: getStudentActivity(student.id) });
                      setShowActivityModal(true);
                    }}
                    className="flex items-center space-x-1 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded"
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">View</span>
                  </button>
                </td>
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(student)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(student.id)} className="p-1 text-red-600 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-900">Student Details</h3>
              <button onClick={() => setShowDetailModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{selectedStudent.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h4>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.phone}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedStudent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedStudent.status}
                  </span>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Batch</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.batch}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Join Date</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.joinDate}</p>
                </div>
              </div>

              <div className="card">
                <h5 className="font-semibold text-gray-900 mb-3">Enrolled Courses</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.enrolledCourses.map((course, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{course}</span>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-blue-50">
                <h5 className="font-semibold text-gray-900 mb-4">Payment Details</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Fee:</span>
                    <span className="font-bold text-gray-900">₹{selectedStudent.totalFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid Amount:</span>
                    <span className="font-bold text-green-600">₹{selectedStudent.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Amount:</span>
                    <span className="font-bold text-red-600">₹{selectedStudent.dueAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: `${(selectedStudent.paidAmount/selectedStudent.totalFee)*100}%`}}></div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h5 className="font-semibold text-gray-900 mb-2">Address</h5>
                <p className="text-gray-600">{selectedStudent.address}</p>
              </div>

              <div className="card">
                <h5 className="font-semibold text-gray-900 mb-4">Course Progress</h5>
                <div className="space-y-4">
                  {selectedStudent.enrolledCourses.map((course, idx) => {
                    const progress = [85, 60, 45][idx] || 50;
                    const status = progress >= 80 ? 'Excellent' : progress >= 60 ? 'Good' : 'In Progress';
                    return (
                      <div key={idx} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{course}</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            progress >= 80 ? 'bg-green-100 text-green-700' : 
                            progress >= 60 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>{status}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{progress}%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-600">
                          <div>Completed: {Math.floor(progress/10)} modules</div>
                          <div>Pending: {10 - Math.floor(progress/10)} modules</div>
                          <div>Last Active: {['Today', 'Yesterday', '2 days ago'][idx]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Batch"
                value={formData.batch}
                onChange={(e) => setFormData({...formData, batch: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  {editingStudent ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Login Activity</h3>
                <p className="text-sm text-gray-600">{selectedActivity.student.name}</p>
              </div>
              <button onClick={() => setShowActivityModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6">
              {selectedActivity.activities.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No activity records found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Login Time</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Logout Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedActivity.activities.filter(a => a.action === 'login').map((activity, idx) => {
                        const logout = selectedActivity.activities.find(
                          a => a.action === 'logout' && new Date(a.timestamp) > new Date(activity.timestamp)
                        );
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{new Date(activity.timestamp).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-sm font-medium text-green-600">{new Date(activity.timestamp).toLocaleTimeString()}</td>
                            <td className="py-3 px-4 text-sm font-medium text-red-600">{logout ? new Date(logout.timestamp).toLocaleTimeString() : 'Active'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
