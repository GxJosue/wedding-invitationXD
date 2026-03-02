import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { AuthContextType, Usuario, Invitado, Admin } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verifica si el usuario está en la base de datos
  const checkUserAuthorization = async (email: string): Promise<Usuario | null> => {
    try {
      // Primero verifica si es admin
      const adminDoc = await getDoc(doc(db, 'admins', email));
      if (adminDoc.exists()) {
        const adminData = adminDoc.data() as Admin;
        setIsAdmin(true);
        setIsAuthorized(true);
        return adminData;
      }

      // Luego verifica si es invitado
      const invitadoDoc = await getDoc(doc(db, 'invitados', email));
      if (invitadoDoc.exists()) {
        const invitadoData = invitadoDoc.data() as Invitado;
        setIsAdmin(false);
        setIsAuthorized(true);
        return invitadoData;
      }

      // Si no está en ninguna colección, no está autorizado
      setIsAuthorized(false);
      setIsAdmin(false);
      return null;
    } catch (error) {
      console.error('Error verificando autorización:', error);
      setIsAuthorized(false);
      setIsAdmin(false);
      return null;
    }
  };

  // Maneja cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const userData = await checkUserAuthorization(currentUser.email);
        
        if (userData) {
          setUsuario(userData);
        } else {
          // Usuario no autorizado - cerrar sesión automáticamente
          await firebaseSignOut(auth);
          setUsuario(null);
          setUser(null);
        }
      } else {
        setUsuario(null);
        setIsAuthorized(false);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Inicia sesión con Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      if (result.user.email) {
        const userData = await checkUserAuthorization(result.user.email);
        
        if (!userData) {
          // Usuario no autorizado
          await firebaseSignOut(auth);
          throw new Error('No tienes acceso a esta invitación');
        }
      }
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Cierra sesión
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUsuario(null);
      setIsAuthorized(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    usuario,
    loading,
    isAdmin,
    isAuthorized,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};