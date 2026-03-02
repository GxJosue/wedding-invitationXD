import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedAccess = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si hay un usuario, cerrar sesión automáticamente
    if (user) {
      const timer = setTimeout(() => {
        signOut().then(() => {
          navigate('/login');
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user, signOut, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-secondary via-white to-wedding-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-wedding-secondary rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-12 h-12 text-wedding-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-elegant text-wedding-dark mb-4">
          Invitación Privada
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lo sentimos, tu correo electrónico no está en la lista de invitados.
        </p>

        <div className="bg-wedding-secondary/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-wedding-dark">
            Si crees que esto es un error, por favor contacta a los novios.
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-gray-500"
        >
          Cerrando sesión automáticamente...
        </motion.p>
      </motion.div>
    </div>
  );
};