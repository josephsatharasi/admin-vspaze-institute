import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const Attendance = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
    setIsPaid(student?.dueAmount === 0);
  }, []);

  const attendanceData = [
    { date: '2024-01-15', status: 'Present', subject: 'Web Development', time: '10:00 AM' },
    { date: '2024-01-16', status: 'Present', subject: 'React Basics', time: '10:00 AM' },
    { date: '2024-01-17', status: 'Absent', subject: 'Node.js', time: '10:00 AM' },
    { date: '2024-01-18', status: 'Present', subject: 'Database', time: '10:00 AM' },
    { date: '2024-01-19', status: 'Present', subject: 'API Development', time: '10:00 AM' },
    { date: '2024-01-22', status: 'Present', subject: 'Authentication', time: '10:00 AM' },
    { date: '2024-01-23', status: 'Late', subject: 'Deployment', time: '10:00 AM' },
    { date: '2024-01-24', status: 'Present', subject: 'Testing', time: '10:00 AM' }
  ];

  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(a => a.status === 'Present').length,
    absent: attendanceData.filter(a => a.status === 'Absent').length,
    late: attendanceData.filter(a => a.status === 'Late').length
  };

  const percentage = ((stats.present / stats.total) * 100).toFixed(1);

  if (!isPaid) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendance Locked</h3>
          <p className="text-gray-600">Complete payment to access attendance records</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Attendance</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <Calendar className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-gray-600 text-sm">Total Classes</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-gray-600 text-sm">Present</p>
          <p className="text-3xl font-bold text-green-600">{stats.present}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <XCircle className="w-8 h-8 text-red-600 mb-2" />
          <p className="text-gray-600 text-sm">Absent</p>
          <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <Clock className="w-8 h-8 text-orange-600 mb-2" />
          <p className="text-gray-600 text-sm">Attendance %</p>
          <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Subject</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record.subject}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.time}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Present' ? 'bg-green-100 text-green-700' :
                      record.status === 'Absent' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
