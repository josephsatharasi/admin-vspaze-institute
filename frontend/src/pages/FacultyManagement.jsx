import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Clock } from 'lucide-react';
import { initializeDummyActivity } from '../utils/initializeDummyActivity';

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = () => {
    const approved = JSON.parse(localStorage.getItem('approved_faculty') || '[]');
    const defaultFaculty = [
      { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@vspaze.com', phone: '1234567890', specialization: 'Data Science', courses: 3, status: 'Active', assignedCourses: ['Data Science & AI', 'Python', 'Machine Learning'], students: 145, experience: '10 years', qualification: 'PhD in Computer Science', joinDate: '2020-01-15', salary: 85000 },
      { id: 2, name: 'Prof. Michael Chen', email: 'michael.c@vspaze.com', phone: '0987654321', specialization: 'Web Development', courses: 2, status: 'Active', assignedCourses: ['Full Stack Development', 'React Advanced'], students: 98, experience: '8 years', qualification: 'Masters in Software Engineering', joinDate: '2021-03-20', salary: 75000 },
      { id: 3, name: 'Dr. Emily Davis', email: 'emily.d@vspaze.com', phone: '5551234567', specialization: 'Cloud Computing', courses: 4, status: 'Active', assignedCourses: ['AWS', 'Azure', 'DevOps', 'Docker'], students: 187, experience: '12 years', qualification: 'PhD in Cloud Architecture', joinDate: '2019-08-10', salary: 95000 }
    ];
    setFaculty([...defaultFaculty, ...approved]);
  };
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', specialization: '', courses: 0, status: 'Active' });
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    initializeDummyActivity();
  }, []);

  const getFacultyActivity = (facultyId) => {
    const activities = JSON.parse(localStorage.getItem('login_activities') || '[]');
    return activities.filter(a => a.userId === `T${facultyId.toString().padStart(3, '0')}` && a.userType === 'teacher');
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
    setEditingFaculty(null);
    setFormData({ name: '', email: '', phone: '', specialization: '', courses: 0, status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setEditingFaculty(member);
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      const updatedFaculty = faculty.filter(f => f.id !== id);
      setFaculty(updatedFaculty);
      const approved = updatedFaculty.filter(f => f.id > 3);
      localStorage.setItem('approved_faculty', JSON.stringify(approved));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedFaculty;
    if (editingFaculty) {
      updatedFaculty = faculty.map(f => f.id === editingFaculty.id ? { ...formData, id: f.id } : f);
    } else {
      updatedFaculty = [...faculty, { ...formData, id: Date.now() }];
    }
    setFaculty(updatedFaculty);
    const approved = updatedFaculty.filter(f => f.id > 3);
    localStorage.setItem('approved_faculty', JSON.stringify(approved));
    setShowModal(false);
  };

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Faculty Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" />
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialization</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Courses</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-green-50 cursor-pointer" onClick={() => { setSelectedFaculty(member); setShowDetailModal(true); }}>
                <td className="py-3 px-4">{member.name}</td>
                <td className="py-3 px-4">{member.email}</td>
                <td className="py-3 px-4">{member.phone}</td>
                <td className="py-3 px-4">{member.specialization}</td>
                <td className="py-3 px-4">{member.courses}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setSelectedActivity({ faculty: member, activities: getFacultyActivity(member.id) });
                      setShowActivityModal(true);
                    }}
                    className="flex items-center space-x-1 text-green-600 hover:bg-green-100 px-2 py-1 rounded"
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">View</span>
                  </button>
                </td>
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(member)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-1 text-red-600 hover:bg-red-100 rounded">
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
      {showDetailModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-900">Faculty Details</h3>
              <button onClick={() => setShowDetailModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{selectedFaculty.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedFaculty.name}</h4>
                  <p className="text-gray-600">{selectedFaculty.specialization}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedFaculty.email}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedFaculty.phone}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedFaculty.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedFaculty.status}
                  </span>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Join Date</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedFaculty.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedFaculty.experience}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedFaculty.students}</p>
                </div>
              </div>

              <div className="card">
                <h5 className="font-semibold text-gray-900 mb-2">Qualification</h5>
                <p className="text-gray-600">{selectedFaculty.qualification}</p>
              </div>

              <div className="card">
                <h5 className="font-semibold text-gray-900 mb-3">Assigned Courses</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedFaculty.assignedCourses.map((course, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{course}</span>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-blue-50">
                <h5 className="font-semibold text-gray-900 mb-2">Salary</h5>
                <p className="text-2xl font-bold text-gray-900">₹{selectedFaculty.salary.toLocaleString()}/month</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingFaculty ? 'Edit Faculty' : 'Add Faculty'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Number of Courses"
                value={formData.courses}
                onChange={(e) => setFormData({...formData, courses: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  {editingFaculty ? 'Update' : 'Add'}
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
                <p className="text-sm text-gray-600">{selectedActivity.faculty.name}</p>
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

export default FacultyManagement;
