import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyStory from '../components/MyStory';
import Experience from '../components/Experience';

const AboutPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div id="story">
        <MyStory scrollY={0} />
      </div>
      <div id="experience" className="py-16">
        <Experience />
      </div>
    </div>
  );
};

export default AboutPage;