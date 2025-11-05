import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronLeft, Award } from 'lucide-react';

const QuizAttempt = ({ quiz, onBack, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'React is a JavaScript library for building user interfaces.',
      correctAnswer: true
    },
    {
      id: 2,
      question: 'CSS stands for Computer Style Sheets.',
      correctAnswer: false
    },
    {
      id: 3,
      question: 'HTML is a programming language.',
      correctAnswer: false
    },
    {
      id: 4,
      question: 'JavaScript can be used for both frontend and backend development.',
      correctAnswer: true
    },
    {
      id: 5,
      question: 'The <div> tag is used to create hyperlinks in HTML.',
      correctAnswer: false
    },
    {
      id: 6,
      question: 'Node.js is built on Chrome\'s V8 JavaScript engine.',
      correctAnswer: true
    },
    {
      id: 7,
      question: 'CSS Grid and Flexbox are the same thing.',
      correctAnswer: false
    },
    {
      id: 8,
      question: 'useState is a React Hook.',
      correctAnswer: true
    },
    {
      id: 9,
      question: 'MongoDB is a relational database.',
      correctAnswer: false
    },
    {
      id: 10,
      question: 'REST API stands for Representational State Transfer Application Programming Interface.',
      correctAnswer: true
    },
    {
      id: 11,
      question: 'The <script> tag must always be placed in the <head> section.',
      correctAnswer: false
    },
    {
      id: 12,
      question: 'JSON stands for JavaScript Object Notation.',
      correctAnswer: true
    },
    {
      id: 13,
      question: 'Git and GitHub are the same thing.',
      correctAnswer: false
    },
    {
      id: 14,
      question: 'Express.js is a Node.js framework.',
      correctAnswer: true
    },
    {
      id: 15,
      question: 'CSS can only be used to style HTML elements.',
      correctAnswer: false
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
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
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
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
    const score = calculateScore();
    onSubmit(score);
  };

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-6">Here's how you performed</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Questions</p>
              <p className="text-3xl font-bold text-blue-600">{score.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
              <p className="text-3xl font-bold text-green-600">{score.correct}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold text-purple-600">{score.percentage}%</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`p-4 rounded-lg border-2 ${
                  answers[q.id] === q.correctAnswer
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {answers[q.id] === q.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium mb-1">{q.question}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">
                        Your answer: <span className={answers[q.id] ? 'text-green-600' : 'text-red-600'}>
                          {answers[q.id] ? 'True' : 'False'}
                        </span>
                      </span>
                      {answers[q.id] !== q.correctAnswer && (
                        <span className="text-gray-600">
                          Correct: <span className="text-green-600">
                            {q.correctAnswer ? 'True' : 'False'}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleFinish}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Finish Quiz
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
            >
              Back to Tests
            </button>
          </div>
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
            True or False
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="p-8 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <CheckCircle className="w-12 h-12 text-gray-400 group-hover:text-green-600 mx-auto mb-3" />
            <span className="text-xl font-bold text-gray-900">True</span>
          </button>

          <button
            onClick={() => handleAnswer(false)}
            className="p-8 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group"
          >
            <XCircle className="w-12 h-12 text-gray-400 group-hover:text-red-600 mx-auto mb-3" />
            <span className="text-xl font-bold text-gray-900">False</span>
          </button>
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
