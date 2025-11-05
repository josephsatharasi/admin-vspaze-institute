import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';

const TestAttempt = ({ test, onBack, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Which CSS property is used to change text color?',
      options: ['text-color', 'font-color', 'color', 'text-style'],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'What is the correct syntax for referring to an external JavaScript file?',
      options: [
        '<script href="app.js">',
        '<script name="app.js">',
        '<script src="app.js">',
        '<script file="app.js">'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'Which HTML tag is used to define an internal style sheet?',
      options: ['<style>', '<css>', '<script>', '<link>'],
      correctAnswer: 0
    },
    {
      id: 5,
      question: 'What does CSS stand for?',
      options: [
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Computer Style Sheets',
        'Colorful Style Sheets'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: 'Which JavaScript method is used to write on browser console?',
      options: ['console.write()', 'console.log()', 'console.print()', 'console.output()'],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'What is the correct HTML element for the largest heading?',
      options: ['<heading>', '<h6>', '<h1>', '<head>'],
      correctAnswer: 2
    },
    {
      id: 8,
      question: 'Which property is used to change the background color in CSS?',
      options: ['bgcolor', 'background-color', 'color-background', 'bg-color'],
      correctAnswer: 1
    },
    {
      id: 9,
      question: 'How do you create a function in JavaScript?',
      options: [
        'function myFunction()',
        'function:myFunction()',
        'create myFunction()',
        'def myFunction()'
      ],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Which HTML attribute specifies an alternate text for an image?',
      options: ['title', 'alt', 'src', 'longdesc'],
      correctAnswer: 1
    }
  ];

  useEffect(() => {
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
  }, []);

  const handleAutoSubmit = () => {
    const score = calculateScore();
    onSubmit(score);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
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

  const handleSubmit = () => {
    const score = calculateScore();
    onSubmit(score);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

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
          <div key={q.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start space-x-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 flex-1">{q.question}</h3>
              {answers[q.id] !== undefined && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            <div className="space-y-3 ml-11">
              {q.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswerSelect(q.id, optionIndex)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[q.id] === optionIndex
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[q.id] === optionIndex
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[q.id] === optionIndex && (
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
