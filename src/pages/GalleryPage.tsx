import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos } from '../data/photos';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = photos.map(photo => ({
  url: photo.image,
  title: photo.title,
  category: 'Featured Work'
}));

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shuffledPhotos, setShuffledPhotos] = useState([...galleryImages].reverse());

  // Shuffle photos on component mount
  useEffect(() => {
    const shuffleArray = (array: GalleryImage[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledPhotos(shuffleArray([...galleryImages].reverse()));
  }, []);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex > 0) {
      setSelectedImage(shuffledPhotos[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex, shuffledPhotos]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex < shuffledPhotos.length - 1) {
      setSelectedImage(shuffledPhotos[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, shuffledPhotos]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        setSelectedImage(shuffledPhotos[selectedIndex - 1]);
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedIndex < shuffledPhotos.length - 1) {
        setSelectedImage(shuffledPhotos[selectedIndex + 1]);
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    }
  }, [selectedImage, selectedIndex, shuffledPhotos]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-black">
      {/* Main Gallery Grid */}
      <div className="pt-16 px-2 md:px-4">
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {shuffledPhotos.map((image, index) => (
            <motion.div
              key={index}
              className="relative mb-2 md:mb-3 break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <div 
                className="group cursor-pointer"
                onClick={() => handleImageClick(image, index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto transform transition-transform duration-700 hover:scale-[1.02]"
                  onLoad={() => setIsLoading(false)}
                />
                <motion.div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                  initial={false}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Navigation Buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={handlePrevious}
                  className={`p-2 bg-black/50 hover:bg-black/70 rounded-r-lg transition-all ${
                    selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                  disabled={selectedIndex === 0}
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={handleNext}
                  className={`p-2 bg-black/50 hover:bg-black/70 rounded-l-lg transition-all ${
                    selectedIndex === shuffledPhotos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                  disabled={selectedIndex === shuffledPhotos.length - 1}
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>

              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-light">{selectedImage.title}</h3>
                <p className="text-white/70 text-sm">{selectedImage.category}</p>
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4">
                <p className="text-white/70 text-sm">
                  {selectedIndex + 1} / {shuffledPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage; 