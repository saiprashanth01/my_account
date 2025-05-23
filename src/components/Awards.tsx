import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

// Import award images
import pravegaAwardImg from '../assets/awards/pravega_award.jpg';
import snistAwardImg from '../assets/awards/snist.jpeg';
import tHubAwardImg from '../assets/awards/thub.JPG';
import tedxAwardImg from '../assets/awards/tedx.JPG';
import csrAwardImg from '../assets/awards/csr.jpeg';
// Nastea Rituals has no specific award image in the folder, using a placeholder/generic image if needed
// import nasteaAwardImg from '...'; 

// Updated awards data with images
const awardsData = [
  { id: 1, title: 'Pravega ShutterBugs – 1st Prize', issuer: 'IISc Bangalore', year: 'Feb 2025', image: pravegaAwardImg },
  { id: 2, title: 'Best Photo of the Day – 1st Prize', issuer: 'Srinidhi College, Hyderabad', year: 'Jun 2023', image: snistAwardImg },
  { id: 3, title: 'Photography Contest – 1st Prize', issuer: 'T-Hub, Hyderabad', year: 'Nov 2023', image: tHubAwardImg },
  { id: 4, title: 'TEDxAnuragU – Speaker & Media Lead', issuer: 'Anurag University', year: 'Mar 2025', image: tedxAwardImg },
  { id: 5, title: 'CSR Summit – Social Media Lead', issuer: 'Shilpakala Vedika', year: 'Mar 2025', image: csrAwardImg },
  { id: 6, title: 'Social Media Manager', issuer: 'Nastea Rituals', year: 'Since Mar 2025', image: null } // No specific image found for Nastea
];

// Define Props including scrollY
interface AwardsProps {
  scrollY: number;
}

const Awards: React.FC<AwardsProps> = ({ scrollY }) => {
  const [hoveredAward, setHoveredAward] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [iconTop, setIconTop] = useState(0); // State for icon's top position

  useEffect(() => {
    if (timelineRef.current) {
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineTop = timelineRect.top + window.scrollY; // Absolute top of timeline
      const timelineHeight = timelineRect.height;
      const windowHeight = window.innerHeight;

      // Calculate how far down the page the viewport center is relative to the timeline
      const scrollRelativeToTimeline = scrollY + windowHeight / 2 - timelineTop;
      
      // Clamp the icon position within the timeline bounds (plus some padding)
      const newTop = Math.max(10, Math.min(scrollRelativeToTimeline, timelineHeight - 30)); // Adjust padding (10, 30)
      setIconTop(newTop);
    }
  }, [scrollY]); // Re-calculate on scroll

  return (
    <section id="awards" className="bg-black py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-['Poppins'] font-semibold text-center text-white mb-20">
          Awards & Recognition
        </h2>
        <div ref={timelineRef} className="relative min-h-[500px]"> {/* Added min-height */}
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 transform -translate-x-1/2"></div>

          {/* Moving Timeline Icon (Camera) - Use state for top position */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 bg-black p-1 rounded-full border-2 border-gray-700 z-20 transition-transform duration-100 ease-linear"
            style={{ top: `${iconTop}px` }}
           >
            <Camera size={20} className="text-white" />
          </div>

          {/* Awards Map */}
          {awardsData.map((award, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={award.id} 
                // Increased vertical spacing 
                className={`py-8 flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
                onMouseEnter={() => setHoveredAward(award.id)}
                onMouseLeave={() => setHoveredAward(null)}
              >
                <div className={`w-5/12 px-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className="relative">
                    <div className={`p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700 relative transform transition-transform duration-300 hover:scale-105 z-10 ${isLeft ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-xl font-['Poppins'] font-semibold text-white mb-2">
                        {award.title}
                      </h3>
                      <p className="text-sm font-['Poppins'] text-gray-300 mb-1">
                        {award.issuer}
                      </p>
                      <p className="text-sm font-['Poppins'] text-gray-400">
                        {award.year}
                      </p>
                    </div>
                    {/* Dropdown Image with smooth transition */}
                    <div 
                      className={`absolute mt-2 z-0 w-full transform transition-all duration-500 ease-out ${isLeft ? 'origin-top-right right-0' : 'origin-top-left left-0'} ${hoveredAward === award.id && award.image ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}
                    >
                      {award.image && (
                        <img 
                          src={award.image} 
                          alt={`${award.title} - Image`} 
                          className="w-full rounded-lg shadow-xl border border-gray-600 object-cover aspect-video"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* Static Placeholder on Timeline for alignment - remove the moving one */}
                {/* Removed the absolute icon from inside the map */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards; 