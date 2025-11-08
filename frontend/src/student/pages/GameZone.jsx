import React, { useState } from 'react';
import { Menu, BarChart3, Trophy, Target, Flame, Star, Play } from 'lucide-react';

const GameZone = ({ onMenuClick, onGameSelect }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const stats = {
    points: 245,
    wins: 12,
    streak: 5,
    rank: 'Gold'
  };

  const games = [
    {
      id: 'quick-quiz',
      title: 'Quick Quiz',
      description: 'Answer simple questions about programming basics',
      points: '+10 pts',
      difficulty: 'Easy',
      icon: '🎯',
      color: 'bg-teal-100'
    },
    {
      id: 'code-memory',
      title: 'Code Memory',
      description: 'Match programming terms with their definitions',
      points: '+15 pts',
      difficulty: 'Easy',
      icon: '🧠',
      color: 'bg-pink-100'
    },
    {
      id: 'code-words',
      title: 'Code Words',
      description: 'Find programming keywords in word search',
      points: '+12 pts',
      difficulty: 'Easy',
      icon: '📝',
      color: 'bg-blue-100'
    },
    {
      id: 'code-challenge',
      title: 'Code Challenge',
      description: 'Solve coding problems under time pressure',
      points: '+25 pts',
      difficulty: 'Moderate',
      icon: '⚡',
      color: 'bg-orange-100'
    },
    {
      id: 'debug-master',
      title: 'Debug Master',
      description: 'Find and fix bugs in code snippets',
      points: '+30 pts',
      difficulty: 'Hard',
      icon: '🔥',
      color: 'bg-red-100'
    }
  ];

  const difficulties = [
    { id: 'easy', label: 'Easy', icon: '😊', color: 'bg-purple-500' },
    { id: 'moderate', label: 'Moderate', icon: '🎯', color: 'bg-orange-500' },
    { id: 'hard', label: 'Hard', icon: '🔥', color: 'bg-red-500' }
  ];

  const filteredGames = selectedDifficulty === 'all' 
    ? games 
    : games.filter(g => g.difficulty.toLowerCase() === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20 md:pb-6">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Game Zone</h1>
                  <p className="text-xs text-gray-600">Learn while having fun!</p>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-1">🏆</div>
              <div className="text-2xl font-bold">{stats.points}</div>
              <div className="text-xs opacity-90">Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🎯</div>
              <div className="text-2xl font-bold">{stats.wins}</div>
              <div className="text-xs opacity-90">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-bold">{stats.streak}</div>
              <div className="text-xs opacity-90">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-2xl font-bold">{stats.rank}</div>
              <div className="text-xs opacity-90">Rank</div>
            </div>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex space-x-3">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition ${
                  selectedDifficulty === diff.id
                    ? `${diff.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span className="text-xl">{diff.icon}</span>
                <span>{diff.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Games List */}
        <div className="space-y-4">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => onGameSelect(game)}
              className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-purple-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                  {game.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{game.title}</h3>
                    <span className="text-sm font-bold text-green-600">{game.points}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium ml-1">{game.difficulty}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameZone;
