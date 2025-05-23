import React, { useRef } from 'react';
import myPhoto from '../assets/about/prashanth_frames-11.jpg'; // Updated image path

// Define props interface
interface MyStoryProps {
  scrollY: number;
}

const MyStory: React.FC<MyStoryProps> = ({ scrollY }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxStyle = { backgroundPositionY: '50%' }; // Default position

  // Calculate parallax effect
  if (sectionRef.current) {
    const rect = sectionRef.current.getBoundingClientRect();
    // Calculate how much of the section is visible or scrolled past
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    // Apply a subtle vertical shift (adjust multiplier for more/less effect)
    const parallaxOffset = scrollPercent * 50; // 50px max offset
    parallaxStyle.backgroundPositionY = `${50 - parallaxOffset}%`; // Adjust from center
  }

  return (
    // Pass ref to section
    <section id="my-story" ref={sectionRef} className="bg-black py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Changed aspect ratio, removed border */}
        <div 
          className="w-full aspect-[4/5] bg-gray-800 rounded-lg bg-cover bg-center relative overflow-hidden"
          style={{ 
            backgroundImage: `url(${myPhoto})`,
            backgroundPositionY: parallaxStyle.backgroundPositionY // Apply only Y-axis parallax
          }}
        ></div>

        {/* Updated story text */}
        <div className="text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-semibold mb-6 text-white">My Story</h2>
          <p className="text-base md:text-lg font-['Poppins'] text-gray-300 mb-4 leading-relaxed">
            I'm Saiprashanth — a photographer, cinematographer, editor, and visual storyteller driven by emotion, light, and the quiet power of frames.
          </p>
          <p className="text-base md:text-lg font-['Poppins'] text-gray-300 mb-4 leading-relaxed">
            My lens finds stories in fleeting glances, vast landscapes, and intimate silences. Whether I'm capturing the raw energy of a crowd, the calm of a sunrise, or crafting a narrative through motion, my goal is to make you feel — to pause, reflect, and connect.
          </p>
          <p className="text-base md:text-lg font-['Poppins'] text-gray-300 mb-4 leading-relaxed">
            Every photograph I take is a moment held still. Every frame I edit is a breath made visible. Every story I tell is shaped by instinct, perspective, and deep visual emotion.
          </p>
          <p className="text-base md:text-lg font-['Poppins'] text-gray-300 leading-relaxed">
            I don't just create images — I translate memories into art.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyStory; 