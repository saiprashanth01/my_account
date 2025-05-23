import React from 'react';
import { motion } from 'framer-motion';
import squareLogo from '../assets/logo 1-1 black.png';

interface PreloaderProps {
  progress: number;
}

const Preloader: React.FC<PreloaderProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <motion.img
        src={squareLogo}
        alt="Loading..."
        className="w-32 h-32 mb-8 object-contain"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-white/70 mt-4 font-['Poppins']">Loading your experience...</p>
    </div>
  );
};

export default Preloader;
