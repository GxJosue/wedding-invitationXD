import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Invitado } from '../types';

export const AdminPanel = () => {
  const { signOut } = useAuth();
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<string | null>(null);
  const [nuevoConfirmados, setNuevoConfirmados] = useState(0);

  const cargarInvitados = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'invitados'));
      const data = querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Invitado);
      setInvitados(data);
    } catch (error) {
      console.error('Error cargando invitados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInvitados();
  }, []);

  const totalConfirmados = invitados.reduce((sum, inv) => sum + (inv.confirmados || 0), 0);
  const totalMaximo = invitados.reduce((sum, inv) => sum + inv.maxInvitados, 0);
  const totalConConfirmacion = invitados.filter(inv => inv.confirmacion).length;

  const handleEditar = (invitado: Invitado) => {
    setEditando(invitado.email);
    setNuevoConfirmados(invitado.confirmados);
  };

  const handleGuardar = async (email: string) => {
    try {
      const docRef = doc(db, 'invitados', email);
      await updateDoc(docRef, {
        confirmados: nuevoConfirmados,
        confirmacion: nuevoConfirmados > 0
      });
      
      await cargarInvitados();
      setEditando(null);
    } catch (error) {
      console.error('Error actualizando:', error);
      alert('Error al actualizar');
    }
  };

  const handleResetear = async (email: string) => {
    if (!confirm('¿Estás seguro de resetear esta confirmación?')) return;

    try {
      const docRef = doc(db, 'invitados', email);
      await updateDoc(docRef, {
        confirmados: 0,
        confirmacion: false
      });
      
      await cargarInvitados();
    } catch (error) {
      console.error('Error reseteando:', error);
      alert('Error al resetear');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-wedding-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-elegant text-wedding-dark">Panel de Administración</h1>
            <p className="text-gray-600 mt-1">Gestión de invitados y confirmaciones</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="px-4 py-2 text-wedding-primary hover:text-wedding-accent transition-colors"
            >
              Ver Invitación
            </a>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Invitados</p>
                <p className="text-3xl font-bold text-wedding-dark mt-1">{invitados.length}</p>
              </div>
              <div className="w-12 h-12 bg-wedding-secondary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-wedding-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Han Confirmado</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{totalConConfirmacion}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Asistentes Confirmados</p>
                <p className="text-3xl font-bold text-wedding-primary mt-1">{totalConfirmados}</p>
              </div>
              <div className="w-12 h-12 bg-wedding-secondary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-wedding-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Capacidad Total</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{totalMaximo}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabla de invitados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-wedding-primary to-wedding-accent text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Máximo</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Confirmados</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Estado</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invitados.map((invitado, index) => (
                  <motion.tr
                    key={invitado.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{invitado.nombre}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">{invitado.email}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                        {invitado.maxInvitados}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editando === invitado.email ? (
                        <input
                          type="number"
                          min="0"
                          max={invitado.maxInvitados}
                          value={nuevoConfirmados}
                          onChange={(e) => setNuevoConfirmados(parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-wedding-primary rounded text-center"
                        />
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-wedding-secondary text-wedding-primary rounded-full font-semibold">
                          {invitado.confirmados}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {invitado.confirmacion ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Confirmado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {editando === invitado.email ? (
                          <>
                            <button
                              onClick={() => handleGuardar(invitado.email)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditando(null)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditar(invitado)}
                              className="px-3 py-1 bg-wedding-primary text-white rounded hover:bg-wedding-accent transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleResetear(invitado.email)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Resetear
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};