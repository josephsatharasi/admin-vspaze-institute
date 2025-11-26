import React, { useState, useEffect } from 'react';
import { FileCheck, Clock, Award, Play, Eye } from 'lucide-react';
import TestAttempt from './TestAttempt';
import QuizAttempt from './QuizAttempt';
import api from '../../utils/api';

const Tests = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [viewResult, setViewResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await api.get('/student/profile');
      const student = profileRes.data.student;
      setStudentData(student);
      const paid = student?.dueAmount === 0;
      setIsPaid(paid);

      if (paid) {
        try {
          const testsRes = await api.get('/student/tests');
          setTests(testsRes.data.tests || []);
        } catch (err) {
          console.error('Error fetching tests:', err);
          setTests([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTestStatus = (test) => {
    const studentAttempt = test.attempts?.find(a => a.student === studentData?._id);
    return studentAttempt ? 'Completed' : 'Available';
  };

  const getTestScore = (test) => {
    const studentAttempt = test.attempts?.find(a => a.student === studentData?._id);
    return studentAttempt ? {
      score: `${studentAttempt.score}/${test.totalMarks}`,
      percentage: studentAttempt.percentage,
      date: studentAttempt.attemptedAt
    } : null;
  };

  const handleStartTest = (test) => {
    setActiveTest(test);
  };

  const handleTestSubmit = async (test, answers) => {
    try {
      const res = await api.post('/student/tests/submit', {
        testId: test._id,
        answers
      });
      alert(`Test completed! Score: ${res.data.percentage}%`);
      setActiveTest(null);
      fetchData();
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Failed to submit test');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (viewResult) {
    return viewResult.type === 'test' ? (
      <TestAttempt test={viewResult} onBack={() => setViewResult(null)} onSubmit={() => {}} viewMode={true} studentData={studentData} />
    ) : (
      <QuizAttempt quiz={viewResult} onBack={() => setViewResult(null)} onSubmit={() => {}} viewMode={true} studentData={studentData} />
    );
  }

  if (activeTest) {
    if (activeTest.type === 'test') {
      return <TestAttempt test={activeTest} onBack={() => setActiveTest(null)} onSubmit={(answers) => handleTestSubmit(activeTest, answers)} />;
    } else {
      return <QuizAttempt quiz={activeTest} onBack={() => setActiveTest(null)} onSubmit={(answers) => handleTestSubmit(activeTest, answers)} />;
    }
  }

  if (!isPaid) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-8 text-center py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <FileCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tests & Quizzes Locked</h3>
          <p className="text-gray-600">Complete payment to access tests and quizzes</p>
        </div>
      </div>
    );
  }

  const completedTests = tests.filter(t => t.status === 'Completed');
  const avgScore = completedTests.length > 0 
    ? (completedTests.reduce((sum, t) => sum + t.percentage, 0) / completedTests.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Tests & Quizzes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <FileCheck className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-gray-600 text-sm">Total Tests</p>
          <p className="text-3xl font-bold text-gray-900">{tests.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <Award className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-600">{completedTests.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <Clock className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-gray-600 text-sm">Average Score</p>
          <p className="text-3xl font-bold text-purple-600">{avgScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <FileCheck className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600">No tests available yet</p>
          </div>
        ) : (
          tests.map((test) => {
            const status = getTestStatus(test);
            const scoreData = getTestScore(test);
            return (
              <div key={test._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">{test.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        test.type === 'quiz' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {test.type === 'quiz' ? 'Quiz' : 'Test'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test.course?.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>⏱️ {test.duration} min</span>
                      <span>❓ {test.questions?.length || 0} questions</span>
                      <span>📅 {new Date(test.date).toLocaleDateString()}</span>
                    </div>
                    {status === 'Completed' && scoreData && (
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Score:</span>
                          <span className="text-lg font-bold text-green-600">{scoreData.score}</span>
                        </div>
                        <div className="flex-1 max-w-xs">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${scoreData.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{scoreData.percentage.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {status === 'Completed' && (
                      <button 
                        onClick={() => setViewResult(test)}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Result</span>
                      </button>
                    )}
                    {status === 'Available' && (
                      <button 
                        onClick={() => handleStartTest(test)}
                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start {test.type === 'quiz' ? 'Quiz' : 'Test'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Tests;
