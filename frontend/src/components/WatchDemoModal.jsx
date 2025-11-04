import React, { useState } from 'react';
import { X, Video, Calendar } from 'lucide-react';

const WatchDemoModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const liveDemoSlots = [
    { id: 1, date: 'Jan 25, 2024', time: '10:00 AM - 11:00 AM', available: true },
    { id: 2, date: 'Jan 26, 2024', time: '2:00 PM - 3:00 PM', available: true },
    { id: 3, date: 'Jan 27, 2024', time: '4:00 PM - 5:00 PM', available: true }
  ];

  const handleLiveDemoSelect = (slot) => {
    setSelectedDemo(slot);
    // Open video for live demo
    window.open('https://meet.google.com/your-demo-link', '_blank');
  };

  const handleRecordedDemo = () => {
    // Open recorded demo video
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Watch Demo</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedOption('live')}
                className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Demo</h3>
                <p className="text-gray-600">Join a live session with our expert</p>
              </button>

              <button
                onClick={() => {
                  setSelectedOption('recorded');
                  handleRecordedDemo();
                }}
                className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Recorded Demo</h3>
                <p className="text-gray-600">Watch pre-recorded demo anytime</p>
              </button>
            </div>
          ) : selectedOption === 'live' ? (
            <div>
              <button
                onClick={() => setSelectedOption(null)}
                className="text-blue-600 hover:text-blue-700 mb-4"
              >
                ← Back
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select a Time Slot</h3>
              <div className="space-y-3">
                {liveDemoSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleLiveDemoSelect(slot)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{slot.date}</p>
                        <p className="text-gray-600">{slot.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Available
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WatchDemoModal;
