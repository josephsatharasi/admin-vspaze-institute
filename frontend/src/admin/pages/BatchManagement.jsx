import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

const BatchManagement = () => {
  const [batches, setBatches] = useState([
    { id: 1, name: 'Batch A-2024', course: 'Full Stack Development', students: 45, faculty: 'Dr. Sarah Johnson', startDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Batch B-2024', course: 'Data Science & AI', students: 38, faculty: 'Prof. Michael Chen', startDate: '2024-02-01', status: 'Active' },
    { id: 3, name: 'Batch C-2024', course: 'Digital Marketing', students: 52, faculty: 'Dr. Emily Davis', startDate: '2024-01-20', status: 'Active' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', course: '', students: 0, faculty: '', startDate: '', status: 'Active' });

  const handleAdd = () => {
    setEditingBatch(null);
    setFormData({ name: '', course: '', students: 0, faculty: '', startDate: '', status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setFormData(batch);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      setBatches(batches.filter(b => b.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBatch) {
      setBatches(batches.map(b => b.id === editingBatch.id ? { ...formData, id: b.id } : b));
    } else {
      setBatches([...batches, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const filteredBatches = batches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Batch Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
          <Plus className="w-5 h-5" />
          <span>Add Batch</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Batch Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Students</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Faculty</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.map((batch) => (
              <tr key={batch.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{batch.name}</td>
                <td className="py-3 px-4">{batch.course}</td>
                <td className="py-3 px-4">{batch.students}</td>
                <td className="py-3 px-4">{batch.faculty}</td>
                <td className="py-3 px-4">{batch.startDate}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    batch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {batch.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(batch)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(batch.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingBatch ? 'Edit Batch' : 'Add Batch'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Batch Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={formData.students}
                onChange={(e) => setFormData({...formData, students: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Faculty Name"
                value={formData.faculty}
                onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="date"
                placeholder="Start Date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                  {editingBatch ? 'Update' : 'Add'}
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

export default BatchManagement;
