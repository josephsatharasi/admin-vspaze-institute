import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-t border-blue-100 py-4 px-6 mt-auto">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>© 2024 vspaze Institute. All rights reserved.</p>
        <p className="flex items-center space-x-1">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>by vspaze Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
