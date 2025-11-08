import React, { useState, useEffect } from 'react';
import { FileCheck, Clock, Award, Play } from 'lucide-react';
import TestAttempt from './TestAttempt';
import QuizAttempt from './QuizAttempt';

const Tests = () => {
  const [studentData, setStudentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    const approvedStudents = JSON.parse(localStorage.getItem('approved_students') || '[]');
    const student = approvedStudents.find(s => s.id === auth.student?.id);
    setStudentData(student);
    setIsPaid(student?.dueAmount === 0);
    
    const savedResults = JSON.parse(localStorage.getItem(`test_results_${student?.id}`) || '{}');
    setTestResults(savedResults);
  }, []);

  const getTestStatus = (testId) => {
    return testResults[testId] ? 'Completed' : 'Available';
  };

  const tests = [
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      type: 'Quiz',
      duration: 20,
      questions: 15,
      status: getTestStatus(1),
      score: testResults[1]?.score,
      percentage: testResults[1]?.percentage,
      date: testResults[1]?.date
    },
    {
      id: 2,
      title: 'JavaScript Basics Test',
      type: 'Test',
      duration: 45,
      questions: 10,
      status: getTestStatus(2),
      score: testResults[2]?.score,
      percentage: testResults[2]?.percentage,
      date: testResults[2]?.date
    },
    {
      id: 3,
      title: 'React Components Quiz',
      type: 'Quiz',
      duration: 20,
      questions: 15,
      status: getTestStatus(3),
      score: testResults[3]?.score,
      percentage: testResults[3]?.percentage,
      date: testResults[3]?.date
    },
    {
      id: 4,
      title: 'Node.js & Express Test',
      type: 'Test',
      duration: 60,
      questions: 10,
      status: getTestStatus(4),
      score: testResults[4]?.score,
      percentage: testResults[4]?.percentage,
      date: testResults[4]?.date
    },
    {
      id: 5,
      title: 'Database Management Quiz',
      type: 'Quiz',
      duration: 30,
      questions: 15,
      status: 'Locked',
      score: null,
      percentage: null,
      date: null
    }
  ];

  const handleStartTest = (test) => {
    setActiveTest(test);
  };

  const handleTestSubmit = (test, score) => {
    const newResults = {
      ...testResults,
      [test.id]: {
        score: `${score.correct}/${score.total}`,
        percentage: parseFloat(score.percentage),
        date: new Date().toISOString()
      }
    };
    setTestResults(newResults);
    localStorage.setItem(`test_results_${studentData.id}`, JSON.stringify(newResults));
    setActiveTest(null);
    alert(`Test completed! Score: ${score.percentage}%`);
  };

  if (activeTest) {
    if (activeTest.type === 'Test') {
      return <TestAttempt test={activeTest} onBack={() => setActiveTest(null)} onSubmit={(score) => handleTestSubmit(activeTest, score)} />;
    } else {
      return <QuizAttempt quiz={activeTest} onBack={() => setActiveTest(null)} onSubmit={(score) => handleTestSubmit(activeTest, score)} />;
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        {tests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">{test.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    test.type === 'Quiz' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {test.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>⏱️ {test.duration} min</span>
                  <span>❓ {test.questions} questions</span>
                  {test.date && <span>📅 {new Date(test.date).toLocaleDateString()}</span>}
                </div>
                {test.status === 'Completed' && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Score:</span>
                      <span className="text-lg font-bold text-green-600">{test.score}</span>
                    </div>
                    <div className="flex-1 max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${test.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{test.percentage}%</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                {test.status === 'Completed' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Completed
                  </span>
                )}
                {test.status === 'Available' && (
                  <button 
                    onClick={() => handleStartTest(test)}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start {test.type}</span>
                  </button>
                )}
                {test.status === 'Locked' && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    Locked
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tests;
