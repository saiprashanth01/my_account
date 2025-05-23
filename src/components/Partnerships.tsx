import React from 'react';

// Import partner logos from assets with updated names
import tHubLogo from '../assets/partners/t-hub-logo.png';
import tedxLogo from '../assets/partners/tedxanuragu.webp';
import csrLogo from '../assets/partners/csr.png';
import nasteaLogo from '../assets/partners/NR LOGO WHITE.png';
import casLogo from '../assets/partners/cas.png';
import laExLogo from '../assets/partners/la ex.png'; // Please verify partner name
import auLogo from '../assets/partners/au.PNG';
import clickCadetsLogo from '../assets/partners/clickcadets.PNG'; // Fixed import name

// Updated partner data using imported logos and new names
const partnerData = [
  { id: 1, name: 'T-Hub Hyderabad', url: tHubLogo },
  { id: 2, name: 'TEDx Anurag University', url: tedxLogo },
  { id: 3, name: 'CSR Summit Shilpakala Vedika', url: csrLogo },
  { id: 4, name: 'Nastea Rituals', url: nasteaLogo },
  { id: 5, name: 'CAS', url: casLogo }, 
  { id: 6, name: 'LA Ex Partner', url: laExLogo }, // Added la ex logo
  { id: 7, name: 'Anurag University', url: auLogo },
  { id: 8, name: 'Click Cadets', url: clickCadetsLogo },
];

const Partnerships: React.FC = () => {
  // Duplicate data for seamless animation effect
  const doubledPartnerData = [...partnerData, ...partnerData];

  return (
    <section className="bg-black py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-['Poppins'] font-semibold text-center text-white mb-12">
          Our Partners & Collaborations
        </h2>
        {/* Container for the scrolling animation */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {doubledPartnerData.map((partner, index) => (
              <li key={`${partner.id}-${index}`}> 
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-10 md:h-12 object-contain filter grayscale hover:grayscale-0 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-300 ease-in-out"
                />
              </li>
            ))}
          </ul>
           {/* Duplicate the list again for the animation */}
           <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {doubledPartnerData.map((partner, index) => (
              <li key={`${partner.id}-${index}-clone`}> 
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-10 md:h-12 object-contain filter grayscale hover:grayscale-0 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-300 ease-in-out"
                />
              </li>
            ))}
          </ul>    
        </div>
      </div>
      {/* Remember to add Keyframes in tailwind.config.js or global CSS */}
    </section>
  );
};

export default Partnerships; 