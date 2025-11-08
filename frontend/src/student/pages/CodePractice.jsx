import React, { useState } from 'react';
import { Play, RotateCcw, HelpCircle, ChevronDown, Menu } from 'lucide-react';

const CodePractice = ({ onMenuClick }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('dart');
  const [code, setCode] = useState(`void main() {
  print('Hello, Dart!');
  // Your code goes here
}`);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { id: 'dart', name: 'DART', template: `void main() {\n  print('Hello, Dart!');\n  // Your code goes here\n}` },
    { id: 'javascript', name: 'JAVASCRIPT', template: `console.log('Hello, JavaScript!');\n// Your code goes here` },
    { id: 'python', name: 'PYTHON', template: `print('Hello, Python!')\n# Your code goes here` },
    { id: 'java', name: 'JAVA', template: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n    // Your code goes here\n  }\n}` },
    { id: 'cpp', name: 'C++', template: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, C++!" << endl;\n  // Your code goes here\n  return 0;\n}` }
  ];

  const handleLanguageChange = (langId) => {
    const lang = languages.find(l => l.id === langId);
    setSelectedLanguage(langId);
    setCode(lang.template);
    setOutput('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab('output');
    
    // Execute code based on current code content
    setTimeout(() => {
      try {
        let result = '';
        
        // Simple execution simulation based on code content
        if (selectedLanguage === 'javascript') {
          // Capture console.log output
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.join(' '));
          
          try {
            eval(code);
            result = logs.join('\n');
          } catch (e) {
            result = `Error: ${e.message}`;
          }
          
          console.log = originalLog;
        } else {
          // For other languages, parse print/println statements
          const printRegex = /(print|println|cout|System\.out\.println)\s*\(['"](.+?)['"]\)/g;
          const matches = [...code.matchAll(printRegex)];
          
          if (matches.length > 0) {
            result = matches.map(m => m[2]).join('\n');
          } else {
            result = 'Code executed successfully! (No output)';
          }
        }
        
        setOutput(result || 'No output generated');
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      
      setIsRunning(false);
    }, 800);
  };

  const handleResetCode = () => {
    const lang = languages.find(l => l.id === selectedLanguage);
    setCode(lang.template);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-700 rounded-full">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Code Practice</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg font-medium cursor-pointer hover:bg-gray-600 transition"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <HelpCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition ${
                activeTab === 'code'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition ${
                activeTab === 'output'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Output</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code/Output Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        {activeTab === 'code' ? (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[calc(100vh-300px)] bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              spellCheck="false"
              style={{ lineHeight: '1.6', tabSize: 2 }}
            />
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 h-[calc(100vh-300px)] overflow-auto">
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              </div>
            ) : output ? (
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500 text-center">Run your code to see output here</p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-16 md:bottom-6 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex space-x-3">
          <button
            onClick={handleResetCode}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Code</span>
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePractice;
