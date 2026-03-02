import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthorized, isAdmin, loading } = useAuth();

  // Muestra loading mientras verifica
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-secondary to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-wedding-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-wedding-dark font-elegant text-xl">Verificando acceso...</p>
        </motion.div>
      </div>
    );
  }

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no está autorizado, muestra mensaje
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si requiere admin y no es admin, redirige
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};