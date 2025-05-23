import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Navigation from './components/Navigation';
import PhotoGrid from './components/PhotoGrid';
import Newsletter from './components/Newsletter';
import Slideshow from './components/Slideshow';
import MyStory from './components/MyStory';
import Awards from './components/Awards';
import Partnerships from './components/Partnerships';
import GetInTouch from './components/GetInTouch';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import ReviewPhotos from './pages/ReviewPhotos';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';
import ConnectPage from './pages/ConnectPage';
import ShopPage from './pages/ShopPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';
import squareLogo from './assets/logo 1-1 black.png';
import heroLogo from './assets/logo_.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactDOM from 'react-dom';

// Import Ooty images
import ooty1 from './assets/ooty_day4_saiprashanth-01.jpg';
import ooty2 from './assets/ooty_day4_saiprashanth-02.jpg';
import ooty3 from './assets/ooty_day4_saiprashanth-03.jpg';
import ooty4 from './assets/ooty_day3_saiprashanth-023.jpg';
import ooty5 from './assets/ooty_day3_saiprashanth-028.jpg';
import ooty6 from './assets/ooty_day2_saiprashanth-048.jpg';
import ooty7 from './assets/ooty_day2_saiprashanth-053.jpg';
import ooty8 from './assets/ooty_day2_saiprashanth-91.jpg';
import ooty9 from './assets/ooty_saiprashanth-15.jpg';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Error handler for async operations
  const handleAsyncError = (error: Error) => {
    console.error('Async operation failed:', error);
    // You can add additional error handling here, like showing a toast notification
  };

  // Preload all components and track progress
  useEffect(() => {
    const preloadComponents = async () => {
      try {
        const pages = [
          <GalleryPage />,
          <BlogPage />,
          <AboutPage />,
          <ConnectPage />,
          <ShopPage />,
          <Contact />,
        ];

        const totalSteps = pages.length;
        let completedSteps = 0;

        // Create a hidden container
        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.width = '0';
        hiddenContainer.style.height = '0';
        hiddenContainer.style.overflow = 'hidden';
        hiddenContainer.style.visibility = 'hidden';
        document.body.appendChild(hiddenContainer);

        // Render each page and update progress
        for (const page of pages) {
          try {
            const div = document.createElement('div');
            hiddenContainer.appendChild(div);
            await new Promise<void>((resolve, reject) => {
              try {
                ReactDOM.render(page, div, () => {
                  completedSteps++;
                  setLoadingProgress((completedSteps / totalSteps) * 100);
                  resolve();
                });
              } catch (error) {
                reject(error);
              }
            });
          } catch (error) {
            console.error('Error preloading page:', error);
            // Continue loading other pages even if one fails
            completedSteps++;
            setLoadingProgress((completedSteps / totalSteps) * 100);
          }
        }

        // Cleanup after a short delay
        setTimeout(() => {
          try {
            document.body.removeChild(hiddenContainer);
          } catch (error) {
            console.error('Error cleaning up preloader:', error);
          }
          setIsLoaded(true);
        }, 1000);
      } catch (error) {
        console.error('Error in preloadComponents:', error);
        setIsLoaded(true); // Continue even if there's an error
      }
    };

    preloadComponents().catch(handleAsyncError);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrollY(window.scrollY);
      } catch (error) {
        console.error('Error handling scroll:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ootyImages = [ooty1, ooty2, ooty3, ooty4, ooty5, ooty6, ooty7, ooty8, ooty9];

  // Calculate text opacity based on scroll position
  const textOpacity = Math.max(0, Math.min(1, 1 - (scrollY / 200)));

  // Calculate logo parallax effect
  const logoParallax = {
    transform: `translateY(${scrollY * -0.5}px)`,
    opacity: Math.max(0, Math.min(1, 1 - (scrollY / 500)))
  };

  // Glow effect values based on scroll
  const heroGlow = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const featuredGlow = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
  const awardsGlow = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);
  const contactGlow = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 1]);

  const HomePage = () => (
    <>
      {/* Hero Section with Slideshow */}
      <div className="relative w-full h-screen overflow-hidden">
        <Slideshow images={ootyImages} />
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-2000 ease-out ${
          isLoaded ? 'opacity-30' : 'opacity-100'
        }`} />

        {/* Hero Content - Parallax Logo */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
          <div className="px-4">
            <div 
              className={`mb-4 transition-all duration-1000 delay-700 ${
                isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
              }`}
              style={logoParallax}
            >
              <img 
                src={heroLogo} 
                alt="Prashanth Frames Logo" 
                className="h-40 md:h-64 lg:h-96 w-auto mx-auto logo-glow"
                style={{ 
                  filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2))'
                }}
              />
            </div>
          </div>
        </div>

        {/* Text at bottom of hero section */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <p 
            className={`text-sm md:text-base font-['Poppins'] font-semibold text-white/90 max-w-2xl mx-auto transition-all duration-300 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              opacity: textOpacity
            }}
          >
            <span className="typing-effect">
              Through the lens of imagination
            </span>
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="relative z-20 bg-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-['Poppins'] font-semibold text-center text-white mb-12">
            Featured Work
          </h3>
          <PhotoGrid refs={undefined} />
        </div>
      </section>

      {/* Awards Section */}
      <Awards scrollY={scrollY} />

      {/* Partnerships Section */}
      <Partnerships />

      {/* My Story Section */}
      <MyStory scrollY={scrollY} />

      {/* Get In Touch Section */}
      <GetInTouch />
    </>
  );

  return (
    <ErrorBoundary>
      <Router>
        <div className="relative bg-black min-h-screen">
          {!isLoaded && <Preloader progress={loadingProgress} />}
          <Navigation isLoaded={isLoaded} activeSection={activeSection} setActiveSection={setActiveSection} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/review" element={<ReviewPhotos />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;