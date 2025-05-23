import React from 'react';
import { motion } from 'framer-motion';

const ReviewPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white py-20"
    >
      {/* Review Form Section */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Share Your Feedback
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-white/70 text-center mb-12"
        >
          Let us know what you think about our photography
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
    </motion.div>
  );
};

export default ReviewPage;
