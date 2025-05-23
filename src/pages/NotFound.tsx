import React from 'react';
import { useNavigate } from 'react-router-dom';
import squareLogo from '../assets/logo 1-1 black.png';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <img 
        src={squareLogo} 
        alt="Logo" 
        className="w-32 h-32 mb-8 opacity-50 object-contain"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl md:text-2xl text-white/70 mb-8 text-center">
        Oops! This page seems to have wandered off frame.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
