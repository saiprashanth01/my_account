import React from 'react';
import { motion } from 'framer-motion';

const BlogPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white py-20"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Blog
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center mt-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 text-center max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-400">
              Our blog section is currently under development. Stay tuned for exciting photography content, tips, and stories!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPage;