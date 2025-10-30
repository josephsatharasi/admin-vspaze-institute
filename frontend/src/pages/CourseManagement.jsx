import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Full Stack Development', duration: '6 months', fee: 45000, students: 245, batches: 5, status: 'Active' },
    { id: 2, name: 'Data Science & AI', duration: '8 months', fee: 52000, students: 198, batches: 4, status: 'Active' },
    { id: 3, name: 'Digital Marketing', duration: '4 months', fee: 38000, students: 312, batches: 6, status: 'Active' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', duration: '', fee: 0, students: 0, batches: 0, status: 'Active' });

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ name: '', duration: '', fee: 0, students: 0, batches: 0, status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...formData, id: c.id } : c));
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.duration}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {course.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold text-gray-900">₹{course.fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold text-gray-900">{course.students}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Batches:</span>
                <span className="font-semibold text-gray-900">{course.batches}</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-4 border-t">
              <button onClick={() => handleEdit(course)} className="flex-1 flex items-center justify-center space-x-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button onClick={() => handleDelete(course.id)} className="flex-1 flex items-center justify-center space-x-1 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingCourse ? 'Edit Course' : 'Add Course'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 6 months)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Fee"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={formData.students}
                onChange={(e) => setFormData({...formData, students: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Number of Batches"
                value={formData.batches}
                onChange={(e) => setFormData({...formData, batches: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  {editingCourse ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
