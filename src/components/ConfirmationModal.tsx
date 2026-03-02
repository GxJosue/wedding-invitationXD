import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Invitado } from '../types';
import { useScrollLock } from '../hooks/useScrollLock'; 

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitado: Invitado;
  onConfirm: (cantidad: number) => Promise<void>;
  fechaLimitePasada: boolean;
}

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  invitado, 
  onConfirm,
  fechaLimitePasada 
}: ConfirmationModalProps) => {
    useScrollLock(isOpen);
  const [confirmados, setConfirmados] = useState(invitado.confirmados || 0);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmar = async () => {
    try {
      setSaving(true);
      await onConfirm(confirmados);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al confirmar asistencia');
    } finally {
      setSaving(false);
    }
  };

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-wedding-primary to-wedding-accent p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-elegant text-white">
                    Confirma tu Asistencia
                  </h3>
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
              <div className="p-6 sm:p-8">
                {showSuccess ? (
                  /* Mensaje de éxito */
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-elegant text-gray-800 mb-2">¡Confirmación Exitosa!</h4>
                    <p className="text-gray-600">Nos vemos el día de la boda ❤️</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Info de invitados */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-wedding-light/50 rounded-xl p-4 border border-wedding-primary/20">
                        <p className="text-sm text-gray-600 mb-1">Invitados permitidos</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent">
                          {invitado.maxInvitados}
                        </p>
                      </div>
                      <div className="bg-wedding-light/50 rounded-xl p-4 border border-wedding-primary/20">
                        <p className="text-sm text-gray-600 mb-1">Confirmados actualmente</p>
                        <p className="text-3xl font-bold text-wedding-accent">
                          {invitado.confirmados || 0}
                        </p>
                      </div>
                    </div>

                    {!invitado.confirmacion && !fechaLimitePasada && (
                      <>
                        {/* Selector */}
                        <div className="bg-gradient-to-br from-white to-wedding-light/30 rounded-xl p-6 border border-wedding-primary/20">
                          <label className="block text-gray-700 font-semibold mb-6 text-center text-lg">
                            ¿Cuántas personas asistirán?
                          </label>
                          <div className="flex items-center justify-center gap-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setConfirmados(Math.max(0, confirmados - 1))}
                              className="w-14 h-14 bg-gradient-to-br from-wedding-primary to-wedding-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl font-bold"
                            >
                              −
                            </motion.button>
                            
                            <div className="text-center min-w-[100px]">
                              <motion.span
                                key={confirmados}
                                initial={{ scale: 1.3, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-6xl font-elegant bg-clip-text text-transparent bg-gradient-to-r from-wedding-primary to-wedding-accent block"
                              >
                                {confirmados}
                              </motion.span>
                              <span className="text-gray-500 text-sm mt-2 block">
                                {confirmados === 1 ? 'persona' : 'personas'}
                              </span>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setConfirmados(Math.min(invitado.maxInvitados, confirmados + 1))}
                              disabled={confirmados >= invitado.maxInvitados}
                              className="w-14 h-14 bg-gradient-to-br from-wedding-accent to-wedding-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>

                        {/* Advertencia */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex gap-3">
                            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-sm text-yellow-800">
                              <strong>Importante:</strong> Solo podrás confirmar una vez. Asegúrate del número correcto.
                            </p>
                          </div>
                        </div>

                        {/* Mensaje del Regalo */}
                        <div className="bg-gradient-to-br from-wedding-secondary to-wedding-light rounded-xl p-6 border-2 border-wedding-primary/30">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-wedding-primary/20 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-wedding-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 mb-2 text-lg">💝 Sobre el Regalo</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                Agradecemos su muestra de cariño 
                                en regalo de <strong className="text-wedding-primary">sobre</strong>. 
                                <span className="block mt-2 italic text-gray-600">
                                  ¡Muchas gracias! ❤️
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Botón Confirmar */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConfirmar}
                          disabled={saving || confirmados === 0}
                          className="w-full bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary text-white py-5 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {saving ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Guardando...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Confirmar Asistencia
                            </span>
                          )}
                        </motion.button>

                        {confirmados === 0 && (
                          <p className="text-sm text-center text-gray-500">
                            Selecciona al menos 1 persona para confirmar
                          </p>
                        )}
                      </>
                    )}

                    {/* Si ya confirmó*/}
                    {invitado.confirmacion && (
                      <div className="space-y-6">
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-green-800 mb-2">
                            ¡Asistencia Confirmada!
                          </h4>
                          <p className="text-green-700">
                            <span className="font-bold text-2xl">{invitado.confirmados}</span> {invitado.confirmados === 1 ? 'persona' : 'personas'}
                          </p>
                        </div>

                        {/* Mensaje del Regalo */}
                        <div className="bg-gradient-to-br from-wedding-secondary to-wedding-light rounded-xl p-6 border-2 border-wedding-primary/30">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-wedding-primary/20 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-wedding-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 mb-2 text-lg">🎁 Sobre el Regalo</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                Agradecemos su muestra de cariño
                                en regalo de <strong className="text-wedding-primary">sobre</strong>. 
                                <span className="block mt-2 italic text-gray-600">
                                  ¡Muchas gracias! ❤️
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-sm text-gray-700 text-center mb-4">
                            <strong>¿Necesitas modificar tu confirmación?</strong><br />
                            Contáctanos
                        </p>
                        <a
                            href="https://wa.me/50379256630?text=Hola,%20necesito%20modificar%20mi%20confirmación%20de%20asistencia%20para%20su%20boda."
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
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};