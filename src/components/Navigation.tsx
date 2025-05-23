import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo_.png';
import { navigationItems as originalNavigationItems } from '../data/navigation';

interface NavigationProps {
  isLoaded: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isLoaded, activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <RouterLink to="/">
            <motion.img 
              src={logo} 
              alt="Prashanth Frames Logo" 
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </RouterLink>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`text-white md:hidden transition-opacity duration-1000 delay-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`hidden md:flex space-x-8 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          {originalNavigationItems.map((item) => (
            <motion.div
              key={item.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <RouterLink
                to={item.path}
                className="nav-item text-white hover:text-gray-300 py-2 relative group"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </RouterLink>
              
              {item.subItems && activeDropdown === item.title && (
                <motion.div
                  className="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {item.subItems.map((subItem) => (
                    <RouterLink
                      key={subItem.name}
                      to={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {subItem.name}
                    </RouterLink>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile menu */}
        <div className={`
          md:hidden fixed inset-0 bg-black/95 z-50 transition-all duration-300
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
          <div className="flex flex-col items-center justify-center h-full overflow-y-auto py-8">
            {originalNavigationItems.map((item) => (
              <div key={item.title} className="w-full px-6 py-2">
                <RouterLink
                  to={item.path}
                  className="block text-white text-xl text-center py-2 relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </RouterLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 