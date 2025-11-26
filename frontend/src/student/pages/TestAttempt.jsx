import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, ChevronLeft, Award, TrendingUp, XCircle, BookOpen } from 'lucide-react';

const TestAttempt = ({ test, onBack, onSubmit, viewMode = false, studentData = null }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showResult, setShowResult] = useState(viewMode);
  const [result, setResult] = useState(null);

  const questions = test.questions || [];

  useEffect(() => {
    if (viewMode && studentData) {
      const studentAttempt = test.attempts?.find(a => a.student === studentData._id);
      if (studentAttempt) {
        const answersObj = {};
        studentAttempt.answers.forEach((ans, idx) => {
          if (ans !== -1) answersObj[idx] = ans;
        });
        setAnswers(answersObj);
        setResult({
          score: studentAttempt.score,
          totalMarks: test.totalMarks,
          percentage: studentAttempt.percentage,
          answers: studentAttempt.answers
        });
      }
    }
  }, [viewMode, studentData, test]);

  useEffect(() => {
    if (!viewMode) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [viewMode]);

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    const answerArray = questions.map((_, index) => answers[index] ?? -1);
    
    // Calculate score locally for display
    let score = 0;
    questions.forEach((q, index) => {
      const studentAnswer = answers[index];
      if (studentAnswer !== undefined && q.correctAnswer.includes(studentAnswer)) {
        score += q.marks || 0;
      }
    });
    
    const percentage = ((score / test.totalMarks) * 100).toFixed(1);
    
    setResult({
      score,
      totalMarks: test.totalMarks,
      percentage,
      answers: answerArray
    });
    
    setShowResult(true);
    setShowSubmitConfirm(false);
    
    // Submit to backend
    onSubmit(answerArray);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  // Result Page
  if (showResult && result) {
    const correctCount = questions.filter((q, index) => {
      const studentAnswer = answers[index];
      return studentAnswer !== undefined && studentAnswer !== -1 && q.correctAnswer.includes(studentAnswer);
    }).length;
    
    const answeredQuestions = Object.keys(answers).filter(key => answers[key] !== -1).length;
    const incorrectCount = answeredQuestions - correctCount;
    const unansweredCount = questions.length - answeredQuestions;
    const passed = parseFloat(result.percentage) >= 40;

    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center space-x-2 text-white hover:text-gray-200">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Tests</span>
            </button>
            <Award className="w-12 h-12" />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{test.title}</h1>
            <p className="text-blue-100">Test Completed Successfully!</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Score</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{result.score}/{result.totalMarks}</p>
            <p className="text-sm text-gray-500 mt-1">Marks Obtained</p>
          </div>

          <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${passed ? 'border-green-600' : 'border-orange-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Percentage</span>
              <Award className={`w-5 h-5 ${passed ? 'text-green-600' : 'text-orange-600'}`} />
            </div>
            <p className={`text-3xl font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>{result.percentage}%</p>
            <p className={`text-sm mt-1 font-semibold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
              {passed ? 'Passed' : 'Need Improvement'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Correct</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{correctCount}</p>
            <p className="text-sm text-gray-500 mt-1">Questions</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Wrong</span>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{incorrectCount + unansweredCount}</p>
            <p className="text-sm text-gray-500 mt-1">Questions</p>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            <span className="text-sm text-gray-600">{correctCount}/{questions.length} Correct</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${passed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}
              style={{ width: `${result.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Answer Review</h2>
          </div>

          <div className="space-y-4">
            {questions.map((q, index) => {
              const studentAnswer = answers[index];
              const isCorrect = studentAnswer !== undefined && studentAnswer !== -1 && q.correctAnswer.includes(studentAnswer);
              
              return (
                <div key={index} className={`border-2 rounded-xl p-5 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-start space-x-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-700 shadow-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{q.question}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        {isCorrect ? (
                          <span className="flex items-center space-x-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            <span>Correct</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-semibold">
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect</span>
                          </span>
                        )}
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                          {q.marks} {q.marks === 1 ? 'mark' : 'marks'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => {
                      const isStudentAnswer = studentAnswer === optionIndex;
                      const isCorrectAnswer = q.correctAnswer.includes(optionIndex);
                      
                      return (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg ${
                            isCorrectAnswer
                              ? 'bg-green-100 border-l-4 border-green-500'
                              : isStudentAnswer
                              ? 'bg-red-100 border-l-4 border-red-500'
                              : 'bg-gray-50 border-l-4 border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-gray-900 text-sm flex-1">{option}</span>
                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1">
                              {isStudentAnswer && !isCorrectAnswer && (
                                <span className="text-xs text-red-700 bg-red-200 px-2 py-1 rounded whitespace-nowrap">Your answer</span>
                              )}
                              {isCorrectAnswer && (
                                <span className="text-xs text-green-700 bg-green-200 px-2 py-1 rounded flex items-center gap-1 whitespace-nowrap">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Correct</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-xs font-semibold text-blue-900 mb-1">💡 Explanation:</p>
                      <p className="text-xs sm:text-sm text-blue-800">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Tests</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`} />
              <span className={`font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Submit Test
            </button>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {answeredCount} / {questions.length} answered</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start space-x-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 flex-1">{q.question}</h3>
              {answers[index] !== undefined && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            <div className="space-y-3 ml-11">
              {q.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswerSelect(index, optionIndex)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[index] === optionIndex
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[index] === optionIndex
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[index] === optionIndex && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Submit Test?</h3>
            <p className="text-gray-600 text-center mb-6">
              You have answered {answeredCount} out of {questions.length} questions.
              {answeredCount < questions.length && ' Unanswered questions will be marked as incorrect.'}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
              >
                Yes, Submit
              </button>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAttempt;
