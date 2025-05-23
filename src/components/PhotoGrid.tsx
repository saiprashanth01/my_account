import React, { useState, useEffect } from 'react';
import { photos } from '../data/photos';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoGridProps {
  refs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

interface ImageSize {
  width: string | number;
  height: string | number;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ refs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 'auto', height: 'auto' });

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    }, 1000); // Change slide every 1 second

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setImageSize({
      width: isLandscape ? '100%' : 'auto',
      height: isLandscape ? 'auto' : '100%'
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg" style={{ height: '600px' }}>
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <motion.div
          key={currentIndex}
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={photos[currentIndex].image}
            alt={photos[currentIndex].title}
            className="max-w-full max-h-full object-contain"
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-center">
        <h4 className="text-white text-lg font-semibold">{photos[currentIndex].title}</h4>
        <p className="text-white/80 text-sm">{photos[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default PhotoGrid;