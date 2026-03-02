import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useInvitado } from '../hooks/useInvitado';

export const Invitation = () => {
  const { usuario, signOut, isAdmin } = useAuth();
  const { invitado, loading, actualizarConfirmacion } = useInvitado(usuario?.email || null);
  const [confirmados, setConfirmados] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmar = async () => {
    if (!invitado) return;

    try {
      setSaving(true);
      await actualizarConfirmacion(confirmados);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al confirmar asistencia');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-secondary to-white">
        <div className="w-16 h-16 border-4 border-wedding-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!invitado) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-secondary via-white to-wedding-secondary py-12 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {isAdmin && (
            <a
              href="/admin"
              className="text-wedding-primary hover:text-wedding-accent transition-colors font-medium"
            >
              ← Panel Admin
            </a>
          )}
          <button
            onClick={signOut}
            className="ml-auto text-gray-600 hover:text-wedding-dark transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Invitación */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Banner decorativo */}
          <div className="bg-gradient-to-r from-wedding-primary to-wedding-accent p-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-elegant mb-2">¡Estás Invitado!</h1>
            <p className="text-wedding-secondary text-lg">A celebrar nuestro amor</p>
          </div>

          {/* Contenido */}
          <div className="p-8 md:p-12">
            {/* Saludo personalizado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-elegant text-wedding-dark mb-4">
                {invitado.nombre}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Nos complace invitarte a compartir este día tan especial para nosotros.
                Tu presencia será el mejor regalo.
              </p>
            </motion.div>

            {/* Información del evento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-wedding-secondary/30 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-wedding-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-elegant text-xl text-wedding-dark mb-2">Fecha</h3>
                <p className="text-gray-700">15 de Junio, 2026</p>
                <p className="text-gray-600 text-sm">5:00 PM</p>
              </div>

              <div className="bg-wedding-secondary/30 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-wedding-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-elegant text-xl text-wedding-dark mb-2">Lugar</h3>
                <p className="text-gray-700">Jardín Los Rosales</p>
                <p className="text-gray-600 text-sm">Av. Principal #123</p>
              </div>
            </motion.div>

            {/* Confirmación de asistencia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-wedding-secondary/50 to-wedding-secondary/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-elegant text-wedding-dark text-center mb-6">
                Confirma tu Asistencia
              </h3>

              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Invitados permitidos:</span>
                    <span className="font-bold text-wedding-primary">{invitado.maxInvitados}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Actualmente confirmados:</span>
                    <span className="font-bold text-wedding-accent">{invitado.confirmados}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    ¿Cuántos asistirán?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setConfirmados(Math.max(0, confirmados - 1))}
                      className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-wedding-secondary transition-all flex items-center justify-center text-2xl font-bold text-wedding-dark"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-4xl font-elegant text-wedding-primary">{confirmados}</span>
                      <span className="text-gray-500 text-sm block">personas</span>
                    </div>
                    <button
                      onClick={() => setConfirmados(Math.min(invitado.maxInvitados, confirmados + 1))}
                      disabled={confirmados >= invitado.maxInvitados}
                      className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-wedding-secondary transition-all flex items-center justify-center text-2xl font-bold text-wedding-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleConfirmar}
                  disabled={saving || confirmados === invitado.confirmados}
                  className="w-full bg-gradient-to-r from-wedding-primary to-wedding-accent text-white py-4 rounded-xl font-medium text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Guardando...' : 'Confirmar Asistencia'}
                </button>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
                    >
                      <p className="text-green-700 font-medium">
                        ✓ Confirmación actualizada exitosamente
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Mensaje final */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 italic">
                "El amor es paciente, el amor es bondadoso"
              </p>
              <p className="text-wedding-primary font-elegant text-lg mt-2">
                ¡Nos vemos pronto!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};