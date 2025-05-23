import React from 'react';
import { motion } from 'framer-motion';

const ReviewPhotos: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Review My Work
        </h1>
        <p className="text-xl text-white/70 text-center mb-12">
          Share your thoughts about my photography
        </p>

        {/* Google Form Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm p-4"
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc0UrmZjcVYpOFElgLQK4x4N6iM7nDFA5yKtlj-J_sJ2Vhtkg/viewform?embedded=true"
            width={640}
            height={1539}
            frameBorder={0}
            style={{ margin: 0 }}
            className="bg-transparent"
            title="Review Form"
          >
            Loading...
          </iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewPhotos;
