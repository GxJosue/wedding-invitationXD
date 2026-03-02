import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { src: '/pareja1.jpg', caption: 'Nuestro primer encuentro' },
    { src: '/pareja2.jpg', caption: 'Momentos inolvidables' },
    { src: '/pareja3.jpg', caption: 'El día que nos comprometimos' },
    // Agrega más fotos aquí si quieres
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-2">
          Nuestra Historia de Amor
        </h3>
        <p className="text-sm sm:text-base text-gray-600">Momentos que nos trajeron hasta aquí</p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Carrusel principal */}
        <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-base sm:text-lg md:text-xl font-script drop-shadow-lg"
                >
                  {photos[currentIndex].caption}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group z-10"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-wedding-primary group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group z-10"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-wedding-primary group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPhoto(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-wedding-primary to-wedding-accent'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-wedding-primary/50'
              }`}
              aria-label={`Ir a foto ${index + 1}`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="text-center mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
};