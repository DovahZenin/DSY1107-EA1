import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SolicitudForm } from '../components/SolicitudForm';
import { solicitudService } from '../services/solicitudService';

export const EditarSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    solicitudService.obtenerPorId(id)
      .then((data) => setInitialData(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleEditar = async (datos) => {
    try {
      setError(null);
      await solicitudService.editarSolicitud(id, datos);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!initialData) return <p>Cargando datos de la solicitud...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Editar Solicitud #{id}</h2>
      <SolicitudForm initialData={initialData} onSubmit={handleEditar} buttonText="Actualizar Solicitud" />
    </div>
  );
};