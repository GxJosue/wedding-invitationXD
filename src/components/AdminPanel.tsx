import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Invitado } from '../types';

export const AdminPanel = () => {
  const { signOut } = useAuth();
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<string | null>(null);
  const [nuevoConfirmados, setNuevoConfirmados] = useState(0);
  const [agregando, setAgregando] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [nuevoInvitado, setNuevoInvitado] = useState({
    nombre: '',
    email: '',
    maxInvitados: 1
  });

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

  const agregarInvitado = async () => {
    if (!nuevoInvitado.nombre || !nuevoInvitado.email) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoInvitado.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    try {
      setAgregando(true);

      // Verificar si el email ya existe
      const emailExiste = invitados.some(inv => inv.email === nuevoInvitado.email);
      if (emailExiste) {
        alert('Este email ya está registrado');
        return;
      }

      const invitadoData: Invitado = {
        nombre: nuevoInvitado.nombre.trim(),
        email: nuevoInvitado.email.toLowerCase().trim(),
        maxInvitados: nuevoInvitado.maxInvitados,
        confirmados: 0,
        confirmacion: false
      };

      // Crear documento en Firestore usando el email como ID
      await setDoc(doc(db, 'invitados', invitadoData.email), invitadoData);

      // Limpiar formulario
      setNuevoInvitado({ nombre: '', email: '', maxInvitados: 1 });
      setShowAddForm(false);

      // Recargar lista
      await cargarInvitados();

      alert('✅ Invitado agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar invitado:', error);
      alert('❌ Error al agregar invitado');
    } finally {
      setAgregando(false);
    }
  };

  const importarInvitadosCSV = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        setAgregando(true);
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Validar que tenga header
        if (lines.length < 2) {
          alert('El archivo CSV está vacío o no tiene formato correcto');
          return;
        }

        const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
        
        // Verificar columnas requeridas
        const nombreIdx = headers.indexOf('nombre');
        const emailIdx = headers.indexOf('email');
        const maxInvitadosIdx = headers.indexOf('maxinvitados');

        if (nombreIdx === -1 || emailIdx === -1) {
          alert('El CSV debe tener las columnas: nombre, email, maxInvitados');
          return;
        }

        let agregados = 0;
        let errores = 0;
        const erroresDetalle: string[] = [];

        // Procesar cada línea
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue; // Saltar líneas vacías

          const values = line.split(',').map(v => v.trim());
          
          const nombre = values[nombreIdx];
          const email = values[emailIdx];
          const maxInvitados = maxInvitadosIdx !== -1 ? parseInt(values[maxInvitadosIdx]) || 1 : 1;

          // Validaciones
          if (!nombre || !email) {
            errores++;
            erroresDetalle.push(`Línea ${i + 1}: Faltan datos`);
            continue;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            errores++;
            erroresDetalle.push(`Línea ${i + 1}: Email inválido (${email})`);
            continue;
          }

          // Verificar duplicados
          const emailExiste = invitados.some(inv => inv.email.toLowerCase() === email.toLowerCase());
          if (emailExiste) {
            errores++;
            erroresDetalle.push(`Línea ${i + 1}: Email ya existe (${email})`);
            continue;
          }

          const invitadoData: Invitado = {
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            maxInvitados: maxInvitados,
            confirmados: 0,
            confirmacion: false
          };

          try {
            await setDoc(doc(db, 'invitados', invitadoData.email), invitadoData);
            agregados++;
          } catch (error) {
            console.error('Error con:', invitadoData.email, error);
            errores++;
            erroresDetalle.push(`Línea ${i + 1}: Error al guardar (${email})`);
          }
        }

        // Recargar lista
        await cargarInvitados();

        // Mostrar resultado
        let mensaje = `✅ Invitados agregados: ${agregados}\n❌ Errores: ${errores}`;
        if (erroresDetalle.length > 0 && erroresDetalle.length <= 5) {
          mensaje += '\n\nDetalles:\n' + erroresDetalle.join('\n');
        } else if (erroresDetalle.length > 5) {
          mensaje += '\n\nPrimeros errores:\n' + erroresDetalle.slice(0, 5).join('\n') + '\n...y más';
        }
        
        alert(mensaje);
      } catch (error) {
        console.error('Error al procesar CSV:', error);
        alert('❌ Error al procesar el archivo CSV');
      } finally {
        setAgregando(false);
      }
    };

    reader.onerror = () => {
      alert('❌ Error al leer el archivo');
      setAgregando(false);
    };

    reader.readAsText(file);
  };

  const descargarPlantillaCSV = () => {
    const csv = 'nombre,email,maxInvitados\nJuan Pérez,juan@ejemplo.com,2\nMaría García,maria@ejemplo.com,1\nCarlos López,carlos@ejemplo.com,3';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_invitados.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddForm ? 'Cancelar' : 'Agregar Nuevo Invitado'}
          </button>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                importarInvitadosCSV(e.target.files[0]);
                e.target.value = ''; // Reset input
              }
            }}
            className="hidden"
            id="csv-upload"
            disabled={agregando}
          />
          <label
            htmlFor="csv-upload"
            className={`cursor-pointer flex items-center gap-2 bg-white border-2 border-wedding-primary text-wedding-primary px-6 py-3 rounded-xl font-semibold hover:bg-wedding-light transition-all ${agregando ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {agregando ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Importando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Importar CSV
              </>
            )}
          </label>

          <button
            onClick={descargarPlantillaCSV}
            className="flex items-center gap-2 bg-gray-100 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Plantilla CSV
          </button>
        </motion.div>

        {/* Formulario para agregar invitado */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-wedding-primary/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-wedding-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Agregar Nuevo Invitado
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={nuevoInvitado.nombre}
                      onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, nombre: e.target.value })}
                      placeholder="Ej: Familia Tal"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-wedding-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={nuevoInvitado.email}
                      onChange={(e) => setNuevoInvitado({ ...nuevoInvitado, email: e.target.value })}
                      placeholder="ejemplo@gmail.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-wedding-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Máximo de Invitados
                    </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={nuevoInvitado.maxInvitados}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNuevoInvitado({ 
                            ...nuevoInvitado, 
                            maxInvitados: value === '' ? '' as any : Math.max(1, parseInt(value) || 1)
                          });
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '' || parseInt(e.target.value) < 1) {
                            setNuevoInvitado({ ...nuevoInvitado, maxInvitados: 1 });
                          }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-wedding-primary focus:outline-none transition-colors"
                      />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={agregarInvitado}
                    disabled={agregando || !nuevoInvitado.nombre || !nuevoInvitado.email}
                    className="flex-1 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {agregando ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Agregando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Agregar Invitado
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNuevoInvitado({ nombre: '', email: '', maxInvitados: 1 });
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Campos obligatorios. El invitado podrá acceder con este email.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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