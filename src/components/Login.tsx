import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      console.error('Error en login:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/fondo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-referrer'
        }}
      >
        {/* Overlay con blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-wedding-primary/20 to-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Decoraciones flotantes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-wedding-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-wedding-accent/20 rounded-full blur-3xl"
        />
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Card con glassmorphism */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          
          {/* Card principal */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header decorativo con glassmorphism */}
            <div className="relative bg-gradient-to-br from-wedding-primary/90 via-wedding-accent/90 to-wedding-primary/90 backdrop-blur-md p-10 text-center">
              {/* Patrón de fondo sutil */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hearts-login" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30,18 C30,12 21,9 15,15 C9,9 0,12 0,18 C0,27 15,36 15,36 C15,36 30,27 30,18 Z" fill="white" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hearts-login)"/>
                </svg>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="relative z-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-2xl border border-white/30">
                  <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-elegant text-white mb-2 drop-shadow-lg relative z-10"
              >
                Boda Martínez Lucero
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-sm backdrop-blur-sm bg-white/10 px-4 py-1 rounded-full inline-block relative z-10"
              >
                Invitación 
              </motion.p>

              {/* Decoración inferior */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 h-px w-24 bg-white/40 mx-auto relative z-10"
              />
            </div>

            {/* Contenido del formulario */}
            <div className="p-8 bg-white/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-center text-gray-700 mb-8 leading-relaxed">
                  Por favor, inicia sesión con tu cuenta de Google para acceder a tu invitación
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl"
                  >
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-white/90 backdrop-blur-sm border-2 border-wedding-primary/30 text-gray-700 py-4 px-4 rounded-xl font-medium hover:bg-white hover:border-wedding-primary hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-wedding-primary/5 to-wedding-accent/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-wedding-primary rounded-full animate-spin"></div>
                        <span>Iniciando sesión...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="font-semibold group-hover:text-wedding-primary transition-colors">
                          Continuar con Google
                        </span>
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-500 text-center mt-6 bg-white/40 backdrop-blur-sm py-2 px-4 rounded-lg"
                >
                  Solo los invitados registrados pueden acceder
                </motion.p>
              </motion.div>
            </div>

            {/* Decoración inferior con glassmorphism */}
            <div className="h-2 bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary"></div>
          </div>
        </div>

        {/* Partículas flotantes decorativas */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8 -right-8 w-16 h-16 bg-wedding-primary/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-8 -left-8 w-20 h-20 bg-wedding-accent/20 rounded-full blur-2xl"
        />
      </motion.div>
    </div>
  );
};