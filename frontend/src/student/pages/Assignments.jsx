import React, { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Assignments = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
    setIsPaid(student?.dueAmount === 0);
  }, []);

  const assignments = [
    {
      id: 1,
      title: 'HTML & CSS Portfolio Website',
      subject: 'Web Development',
      dueDate: '2024-02-01',
      status: 'Submitted',
      grade: '95/100',
      description: 'Create a responsive portfolio website using HTML and CSS'
    },
    {
      id: 2,
      title: 'JavaScript Calculator',
      subject: 'JavaScript',
      dueDate: '2024-02-05',
      status: 'Submitted',
      grade: '88/100',
      description: 'Build a functional calculator using vanilla JavaScript'
    },
    {
      id: 3,
      title: 'React Todo Application',
      subject: 'React',
      dueDate: '2024-02-10',
      status: 'Pending',
      grade: null,
      description: 'Create a todo app with CRUD operations using React hooks'
    },
    {
      id: 4,
      title: 'REST API Development',
      subject: 'Backend',
      dueDate: '2024-02-15',
      status: 'Not Started',
      grade: null,
      description: 'Build a RESTful API using Node.js and Express'
    },
    {
      id: 5,
      title: 'Full Stack E-commerce',
      subject: 'Full Stack',
      dueDate: '2024-02-25',
      status: 'Not Started',
      grade: null,
      description: 'Create a complete e-commerce application with authentication'
    }
  ];

  if (!isPaid) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Assignments Locked</h3>
          <p className="text-gray-600">Complete payment to access assignments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Assignments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <FileText className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-gray-600 text-sm">Total Assignments</p>
          <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-gray-600 text-sm">Submitted</p>
          <p className="text-3xl font-bold text-green-600">
            {assignments.filter(a => a.status === 'Submitted').length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <Clock className="w-8 h-8 text-orange-600 mb-2" />
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-orange-600">
            {assignments.filter(a => a.status === 'Pending' || a.status === 'Not Started').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">{assignment.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📚 {assignment.subject}</span>
                  <span>📅 Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  {assignment.grade && <span>📊 Grade: {assignment.grade}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assignment.status === 'Submitted' ? 'bg-green-100 text-green-700' :
                  assignment.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {assignment.status}
                </span>
                {assignment.status !== 'Submitted' && (
                  <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
