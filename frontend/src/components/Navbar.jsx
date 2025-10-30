import React, { useState } from 'react';
import { Users, GraduationCap, BookOpen, Calendar, CreditCard, Home } from 'lucide-react';

const Navbar = () => {
  const [active, setActive] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'batches', label: 'Batches', icon: Calendar },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'payments', label: 'Payments', icon: CreditCard }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-all ${
                active === item.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
