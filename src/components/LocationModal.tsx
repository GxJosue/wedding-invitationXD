import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '../hooks/useScrollLock';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
  useScrollLock(isOpen);
  const location = {
    name: "Edificio Kali",
    address: "3a Calle Poniente y, 10a Avenida Sur, Santa Ana",
    lat: 13.993895861497052,  // ⬅️ REEMPLAZA con tu latitud
    lng: -89.56166991007812, // ⬅️ REEMPLAZA con tu longitud 
    googleMapsUrl: "https://share.google/HEckk0y4K0MSTVIuJ", 
  };

  
const embedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto mx-auto"
              >
              {/* Header del Modal */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-wedding-primary to-wedding-accent p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-elegant text-white">
                      ¿Cómo Llegar?
                    </h3>
                    <p className="text-sm text-white/80">Te esperamos aquí</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group"
                >
                  <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido */}
              <div className="p-0">
                {/* Mapa */}
                <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="Ubicación del evento"
                  />
                </div>

                {/* Info y Botones */}
                <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-wedding-light/30">
                  {/* Información del lugar */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{location.name}</h4>
                      <p className="text-sm sm:text-base text-gray-600">{location.address}</p>
                    </div>
                  </div>

                      {/* Botones de navegación */}
                      <div className="flex justify-center">
                        {/* Google Maps */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto bg-gradient-to-r from-wedding-primary to-wedding-accent text-white py-4 px-8 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                        >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C7.589 0 4 3.589 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                      </svg>
                      <span className="text-sm sm:text-base font-semibold">Google Maps</span>
                    </a>

                    {/* Waze */}
                  </div>

                  {/* Botón copiar dirección */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(location.address);
                      alert('¡Dirección copiada!');
                    }}
                    className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 hover:border-wedding-primary/30 transition-all"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar Dirección</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};