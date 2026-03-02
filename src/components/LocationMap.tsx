import { motion } from 'framer-motion';

export const LocationMap = () => {
  const location = {
    name: "Jardín Los Rosales",
    address: "Av. Principal #123",
    lat: 13.9938585,  
    lng: -89.5642605, 
    googleMapsUrl: "https://share.google/HEckk0y4K0MSTVIuJ", // ⬅️ REEMPLAZA con tu enlace
  };

  // URL para Google Maps embed
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDcnNTkuNSJX!5e0!3m2!1ses!2smx!4v1234567890`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-8 sm:py-12"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-2 sm:mb-3">
          ¿Cómo Llegar?
        </h3>
        <p className="text-sm sm:text-base text-gray-600">Te esperamos en este hermoso lugar</p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-wedding-primary/10">
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
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Google Maps */}
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C7.589 0 4 3.589 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
              <span className="text-sm sm:text-base font-semibold">Abrir en Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};