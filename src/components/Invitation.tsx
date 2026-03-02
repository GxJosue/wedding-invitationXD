import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useInvitado } from "../hooks/useInvitado";
import { Countdown } from "./Countdown";

export const Invitation = () => {
  const { usuario, signOut, isAdmin } = useAuth();
  const { invitado, loading, actualizarConfirmacion } = useInvitado(
    usuario?.email || null,
  );
  const [confirmados, setConfirmados] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Configuración de fecha límite
  const FECHA_LIMITE = new Date("2026-03-03T23:59:59"); 
  const fechaLimitePasada = new Date() > FECHA_LIMITE;

  useEffect(() => {
    if (invitado) {
      setConfirmados(invitado.confirmados || 0);
    }
  }, [invitado]);

  const handleConfirmar = async () => {
    if (!invitado) return;

    try {
      setSaving(true);
      await actualizarConfirmacion(confirmados);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al confirmar asistencia");
    } finally {
      setSaving(false);
    }
  };

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

              {/* Información del evento */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                {/* Fecha */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-wedding-primary/10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-full mb-4 shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-elegant text-2xl bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-3">
                      Fecha & Hora
                    </h3>
                    <p className="text-gray-800 text-lg font-semibold mb-1">
                      15 de Junio, 2026
                    </p>
                    <p className="text-wedding-primary font-medium">5:00 PM</p>
                  </div>
                </motion.div>

                {/* Lugar */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-accent to-wedding-primary rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-wedding-primary/10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-wedding-accent to-wedding-primary rounded-full mb-4 shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-elegant text-2xl bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-3">
                      Lugar
                    </h3>
                    <p className="text-gray-800 text-lg font-semibold mb-1">
                      Jardín Los Rosales
                    </p>
                    <p className="text-wedding-primary font-medium">
                      Av. Principal #123
                    </p>
                  </div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary/5 to-wedding-accent/5 rounded-3xl blur-xl"></div>

                <div className="relative bg-gradient-to-br from-white to-wedding-light/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-wedding-primary/20">
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="inline-block mb-4"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-wedding-primary to-wedding-accent rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent mb-2">
                      Confirma tu Asistencia
                    </h3>
                    {!fechaLimitePasada ? (
                      <p className="text-xs sm:text-sm text-wedding-primary font-semibold">
                        Fecha límite:{" "}
                        {FECHA_LIMITE.toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-red-600 font-semibold">
                        ⚠️ La fecha límite de confirmación ha expirado
                      </p>
                    )}
                  </div>

                  <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
                    {/* Info de invitados */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-wedding-primary/20">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          Invitados permitidos
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent">
                          {invitado.maxInvitados}
                        </p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-wedding-primary/20">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          Ya confirmados
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold text-wedding-accent">
                          {invitado.confirmados || 0}
                        </p>
                      </div>
                    </div>

                    {/* SI LA FECHA LÍMITE PASÓ */}
                    {fechaLimitePasada && !invitado.confirmacion ? (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-red-800 mb-2">
                              Fecha Límite Expirada
                            </h4>
                            <p className="text-red-700 text-sm mb-4">
                              La fecha límite para confirmar asistencia ha
                              pasado. Las confirmaciones en línea ya no están
                              disponibles.
                            </p>

                            <div className="bg-white/80 rounded-lg p-4 border border-red-200">
                              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                <strong>¿Aún deseas confirmar?</strong>
                                <br />
                                Por favor, contáctanos directamente.
                              </p>
                              <div className="pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-600">
                                  💬 WhatsApp:{" "}
                                  <span className="font-semibold">
                                    79256630
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : invitado.confirmacion ? (
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-green-800 mb-1">
                              ¡Asistencia Confirmada!
                            </h4>
                            <p className="text-green-700 text-sm">
                              Has confirmado la asistencia de{" "}
                              <span className="font-bold">
                                {invitado.confirmados}
                              </span>{" "}
                              {invitado.confirmados === 1
                                ? "persona"
                                : "personas"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white/80 rounded-lg p-4 border border-green-200">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            <strong>
                              ¿Necesitas modificar tu confirmación?
                            </strong>
                            <br />
                            Por favor, contáctanos directamente para realizar
                            cualquier cambio.
                          </p>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600">
                               💬 WhatsApp:{" "}
                              <span className="font-semibold">
                                79256630
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-wedding-primary/20">
                          <label className="block text-gray-700 font-semibold mb-4 text-center text-sm sm:text-base">
                            ¿Cuántas personas asistirán?
                          </label>
                          <div className="flex items-center justify-center gap-4 sm:gap-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                setConfirmados(Math.max(0, confirmados - 1))
                              }
                              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-wedding-primary to-wedding-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl sm:text-2xl font-bold"
                            >
                              −
                            </motion.button>

                            <div className="text-center min-w-[80px] sm:min-w-[100px]">
                              <motion.span
                                key={confirmados}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl sm:text-5xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent block"
                              >
                                {confirmados}
                              </motion.span>
                              <span className="text-gray-500 text-xs sm:text-sm">
                                {confirmados === 1 ? "persona" : "personas"}
                              </span>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                setConfirmados(
                                  Math.min(
                                    invitado.maxInvitados,
                                    confirmados + 1,
                                  ),
                                )
                              }
                              disabled={confirmados >= invitado.maxInvitados}
                              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-wedding-accent to-wedding-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl sm:text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
                          <div className="flex gap-2 sm:gap-3">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <p className="text-xs sm:text-sm text-yellow-800">
                              <strong>Importante:</strong> Solo podrás confirmar
                              una vez.
                            </p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConfirmar}
                          disabled={saving || confirmados === 0}
                          className="w-full bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {saving ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <span className="text-sm sm:text-base">
                                  Guardando...
                                </span>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-sm sm:text-base">
                                  Confirmar Asistencia
                                </span>
                              </>
                            )}
                          </span>
                        </motion.button>

                        {confirmados === 0 && (
                          <p className="text-xs sm:text-sm text-center text-gray-500">
                            Selecciona al menos 1 persona para confirmar
                          </p>
                        )}
                      </>
                    )}

                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-green-700 font-medium text-sm sm:text-base">
                              ¡Confirmación guardada exitosamente!
                            </p>
                            <p className="text-green-600 text-xs sm:text-sm">
                              Nos vemos el día de la boda ❤️
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

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
    </div>
  );
};
