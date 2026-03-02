import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Invitado } from '../types';

export const useInvitado = (email: string | null) => {
  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchInvitado = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'invitados', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInvitado(docSnap.data() as Invitado);
        } else {
          setError('No se encontró información del invitado');
        }
      } catch (err) {
        console.error('Error al obtener invitado:', err);
        setError('Error al cargar la información');
      } finally {
        setLoading(false);
      }
    };

    fetchInvitado();
  }, [email]);

  const actualizarConfirmacion = async (confirmados: number) => {
    if (!email || !invitado) return;

    try {
      const docRef = doc(db, 'invitados', email);
      await updateDoc(docRef, {
        confirmados,
        confirmacion: confirmados > 0
      });

      setInvitado({
        ...invitado,
        confirmados,
        confirmacion: confirmados > 0
      });
    } catch (err) {
      console.error('Error al actualizar confirmación:', err);
      throw new Error('No se pudo actualizar la confirmación');
    }
  };

  return { invitado, loading, error, actualizarConfirmacion };
};