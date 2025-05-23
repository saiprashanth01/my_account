import React from 'react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2020 - Present',
      title: 'Professional Photographer',
      description: 'Specializing in landscape and portrait photography, with a focus on capturing the essence of natural beauty and human emotions.',
      achievements: [
        'Published in various photography magazines',
        'Conducted photography workshops',
        'Featured in local exhibitions'
      ]
    },
    {
      period: '2018 - 2020',
      title: 'Photography Assistant',
      description: 'Worked alongside experienced photographers, learning advanced techniques and developing a unique style.',
      achievements: [
        'Assisted in major photography projects',
        'Managed photo editing and post-processing',
        'Handled client communications'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My Experience
      </motion.h2>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="bg-white/5 rounded-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-1/4">
                <h3 className="text-xl font-semibold text-gray-300">{exp.period}</h3>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-2xl font-bold mb-4">{exp.title}</h4>
                <p className="text-gray-300 mb-6">{exp.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
