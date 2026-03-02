import { useState,} from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useInvitado } from "../hooks/useInvitado";
import { Countdown } from "./Countdown";
import { PhotoCarousel } from './PhotoCarousel';
import { LocationModal } from './LocationModal';
import { ConfirmationModal } from './ConfirmationModal';

export const Invitation = () => {
  const { usuario, signOut, isAdmin } = useAuth();
  const { invitado, loading, actualizarConfirmacion } = useInvitado(
    usuario?.email || null,
  );
const [showLocationModal, setShowLocationModal] = useState(false);
const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Configuración de fecha límite
  const FECHA_LIMITE = new Date("2026-03-29T23:59:59"); 
  const fechaLimitePasada = new Date() > FECHA_LIMITE;


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-light via-white to-wedding-secondary">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-wedding-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-wedding-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-wedding-primary font-elegant text-xl">
            Cargando tu invitación...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!invitado) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-light via-white to-wedding-secondary relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-wedding-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-wedding-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 py-8 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          {isAdmin && (
            <a
              href="/admin"
              className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-wedding-primary/20"
            >
              <svg
                className="w-5 h-5 text-wedding-primary group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-wedding-primary font-medium">
                Panel Admin
              </span>
            </a>
          )}
          <button
            onClick={signOut}
            className="ml-auto px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-wedding-primary border border-gray-200"
          >
            Cerrar sesión
          </button>
        </motion.div>

        {/* Tarjeta Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-wedding-primary/10">
            {/* Header con imagen decorativa */}
            <div className="relative h-80 bg-gradient-to-br from-wedding-primary via-wedding-accent to-wedding-primary overflow-hidden">
              {/* Patrón decorativo */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="hearts"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M50,30 C50,20 35,15 25,25 C15,15 0,20 0,30 C0,45 25,60 25,60 C25,60 50,45 50,30 Z"
                        fill="white"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hearts)" />
                </svg>
              </div>

              {/* Contenido del header */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse-slow"></div>
                    <svg
                      className="w-24 h-24 relative z-10 drop-shadow-2xl"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-5xl md:text-6xl font-script mb-3 text-center drop-shadow-lg"
                >
                  ¡Estás Invitado!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl font-light text-white/90"
                >
                  A celebrar nuestro amor
                </motion.p>

                {/* Decoración inferior */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-6 h-px w-32 bg-white/50"
                />
              </div>

              {/* Olas decorativas */}
              <div className="absolute bottom-0 left-0 right-0">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-full h-16"
                >
                  <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8 md:p-12 lg:p-16">
              {/* Nombre del invitado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center mb-12"
              >
                <p className="text-sm uppercase tracking-widest text-wedding-accent mb-3 font-medium">
                  Con mucho cariño para
                </p>
                <h2 className="text-4xl md:text-5xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-6">
                  {invitado.nombre}
                </h2>
                <div className="max-w-2xl mx-auto">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Nos complace invitarte a compartir este día tan especial
                    para nosotros. Tu presencia será el mejor regalo.
                  </p>
                </div>
              </motion.div>

              {/* Versículo Bíblico */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="relative mb-16"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="relative bg-gradient-to-br from-wedding-secondary to-wedding-light rounded-2xl p-8 md:p-10 shadow-lg border border-wedding-primary/20">
                    {/* Comillas decorativas */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-wedding-primary rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-xl md:text-2xl font-script text-center text-gray-700 leading-relaxed mb-4 italic"
                    >
                      "El amor es paciente, es bondadoso. El amor no es
                      envidioso ni jactancioso ni orgulloso."
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="text-center text-wedding-primary font-semibold text-sm uppercase tracking-wider"
                    >
                      1 Corintios 13:4
                    </motion.p>

                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-wedding-accent rounded-full flex items-center justify-center shadow-lg rotate-180">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              <PhotoCarousel />

              {/* Información del evento */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
              {/* Fecha con gradiente y patrón */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg h-full"
              >
                {/* Fondo con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary via-wedding-accent to-wedding-primary">
                  {/* Patrón decorativo */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="clock-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                          {/* Círculos de reloj */}
                          <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="2"/>
                          <circle cx="40" cy="40" r="3" fill="white"/>
                          <line x1="40" y1="40" x2="40" y2="20" stroke="white" strokeWidth="2"/>
                          <line x1="40" y1="40" x2="55" y2="40" stroke="white" strokeWidth="2"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#clock-pattern)"/>
                    </svg>
                  </div>
                </div>

                {/* Contenido */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white min-h-[320px]">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full shadow-xl border-2 border-white/30 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="font-elegant text-2xl mb-3 drop-shadow-lg">Fecha & Hora</h3>
                    
                    {/* Fecha grande y destacada */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-5xl font-bold mb-2 font-elegant">15</p>
                      <p className="text-lg font-semibold">Junio 2026</p>
                    </div>
                    
                    {/* Hora */}
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xl font-semibold">5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-1 w-24 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 pointer-events-none"></div>
              </motion.div>

                {/* Lugar con imagen de fondo */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg h-full"
                >
                  {/* Imagen de fondo */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: 'url(/lugar.jpg)' 
                    }}
                  >
                    {/* Overlay oscuro con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                  </div>

                  {/* Contenido */}
                  <div className="relative h-full flex flex-col justify-between p-8 text-white min-h-[320px]">
                    {/* Icono superior */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full shadow-xl border-2 border-white/30">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Información */}
                    <div className="text-center space-y-2">
                      <h3 className="font-elegant text-2xl mb-3 drop-shadow-lg">Lugar</h3>
                      <p className="text-white text-lg font-semibold mb-1 drop-shadow-md">Edificio Kali</p>
                      <p className="text-white/90 font-medium drop-shadow-md">3a Calle Poniente y, 10a Avenida Sur, Santa Ana</p>
                    </div>

                    {/* Botón Cómo Llegar */}
                    <button
                      onClick={() => setShowLocationModal(true)}
                      className="w-full bg-white/95 backdrop-blur-sm text-wedding-primary py-3 px-6 rounded-xl font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>Cómo Llegar</span>
                    </button>
                  </div>

                  {/* Brillo decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wedding-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
              </motion.div>


              {/* Cuenta Regresiva */}
              <Countdown />

                {/* Confirmación de Asistencia */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="relative px-4 sm:px-0"
                >
                  <div className="max-w-2xl mx-auto">
                    {invitado.confirmacion ? (
                      /* Ya confirmó - Card simple */
                      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl sm:rounded-3xl p-8 shadow-xl border-2 border-green-200">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          
                          <h3 className="text-3xl font-elegant text-green-800 mb-3">
                            ¡Asistencia Confirmada!
                          </h3>
                          
                          <p className="text-green-700 text-lg mb-8">
                             <span className="font-bold text-2xl">{invitado.confirmados}</span> {invitado.confirmados === 1 ? 'invitado' : 'invitados'}
                          </p>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowConfirmationModal(true)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver Confirmación
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      /* No ha confirmado - Card de invitación */
                      <div className="bg-gradient-to-br from-white to-wedding-light/30 rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-wedding-primary/20">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="inline-block mb-6"
                          >
                            <div className="w-20 h-20 bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </motion.div>

                          <h3 className="text-3xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-3">
                            Confirma tu Asistencia
                          </h3>
                          
                          <p className="text-gray-600 mb-2">
                            Por favor, háznoslo saber lo antes posible
                          </p>
                          
                          {!fechaLimitePasada ? (
                            <p className="text-sm text-wedding-primary font-semibold mb-8">
                              Fecha límite: {FECHA_LIMITE.toLocaleDateString("es-MX", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          ) : (
                            <p className="text-sm text-red-600 font-semibold mb-8">
                              ⚠️ Fecha límite expirada
                            </p>
                          )}

                          {!fechaLimitePasada ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowConfirmationModal(true)}
                              className="inline-flex items-center gap-3 bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Confirmar
                            </motion.button>
                          ) : (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                              <p className="text-red-700 mb-4">
                                La fecha límite ha pasado. Contáctanos si deseas asistir.
                              </p>
                              <a
                                href="https://wa.me/50379256630?text=Hola,%20quiero%20confirmar%20mi%20asistencia%20a%20la%20boda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group"
                              >
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Modal de Confirmación */}
                <ConfirmationModal
                  isOpen={showConfirmationModal}
                  onClose={() => setShowConfirmationModal(false)}
                  invitado={invitado}
                  onConfirm={actualizarConfirmacion}
                  fechaLimitePasada={fechaLimitePasada}
                />

              {/* Mensaje final */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mt-16 space-y-4"
              >
                <div className="inline-block">
                  <motion.div>
                    <svg
                      className="w-12 h-12 text-wedding-primary mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                </div>
                <p className="text-2xl font-script bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent">
                  ¡Nos vemos pronto!
                </p>
                <p className="text-gray-500 text-sm">
                  Con mucho amor, esperamos contar contigo
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
            {/* Modal de Ubicación */}
      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </div>
  );
};
