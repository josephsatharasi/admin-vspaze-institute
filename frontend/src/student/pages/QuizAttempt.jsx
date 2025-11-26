import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronLeft, Award, TrendingUp, BookOpen } from 'lucide-react';

const QuizAttempt = ({ quiz, onBack, onSubmit, viewMode = false, studentData = null }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(viewMode);

  const questions = quiz.questions || [];

  useEffect(() => {
    if (viewMode && studentData) {
      const studentAttempt = quiz.attempts?.find(a => a.student === studentData._id);
      if (studentAttempt) {
        const answersObj = {};
        studentAttempt.answers.forEach((ans, idx) => {
          if (ans !== -1) answersObj[idx] = ans;
        });
        setAnswers(answersObj);
      }
    }
  }, [viewMode, studentData, quiz]);

  const handleAnswer = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      const studentAnswer = answers[index];
      if (studentAnswer !== undefined && studentAnswer !== -1 && q.correctAnswer.includes(studentAnswer)) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: ((correct / questions.length) * 100).toFixed(1)
    };
  };

  const handleFinish = () => {
    const answerArray = questions.map((_, index) => answers[index] ?? -1);
    onSubmit(answerArray);
  };

  if (showResult) {
    const score = calculateScore();
    const passed = parseFloat(score.percentage) >= 40;
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    const obtainedMarks = questions.reduce((sum, q, index) => {
      const studentAnswer = answers[index];
      const isCorrect = studentAnswer !== undefined && q.correctAnswer.includes(studentAnswer);
      return sum + (isCorrect ? (q.marks || 0) : 0);
    }, 0);

    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center space-x-2 text-white hover:text-gray-200">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Tests</span>
            </button>
            <Award className="w-12 h-12" />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-purple-100">Quiz Completed Successfully!</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Score</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{obtainedMarks}/{totalMarks}</p>
            <p className="text-sm text-gray-500 mt-1">Marks Obtained</p>
          </div>

          <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${passed ? 'border-green-600' : 'border-orange-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Percentage</span>
              <Award className={`w-5 h-5 ${passed ? 'text-green-600' : 'text-orange-600'}`} />
            </div>
            <p className={`text-3xl font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>{score.percentage}%</p>
            <p className={`text-sm mt-1 font-semibold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
              {passed ? 'Passed' : 'Need Improvement'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Correct</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{score.correct}</p>
            <p className="text-sm text-gray-500 mt-1">Questions</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Incorrect</span>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{score.total - score.correct}</p>
            <p className="text-sm text-gray-500 mt-1">Questions</p>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            <span className="text-sm text-gray-600">{score.correct}/{score.total} Correct</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${passed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'}`}
              style={{ width: `${score.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600" />
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
                          {q.marks || 1} {(q.marks || 1) === 1 ? 'mark' : 'marks'}
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

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => { handleFinish(); }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold shadow-md"
          >
            Finish Quiz
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Exit Quiz</span>
          </button>
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            {questions[currentQuestion].type === 'multi' ? 'Multiple Choice' : 'Single Choice'}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleAnswer(optionIndex)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-gray-900">{option}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < currentQuestion
                  ? 'bg-green-600'
                  : index === currentQuestion
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
