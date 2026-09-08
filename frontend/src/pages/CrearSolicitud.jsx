import React, { useState } from 'react';
import { SolicitudForm } from '../components/SolicitudForm';
import { solicitudService } from '../services/solicitudService';
import { useNavigate } from 'react-router-dom';

export const CrearSolicitud = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCrear = async (datos) => {
    try {
      setError(null);
      await solicitudService.crearSolicitud(datos);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Crear Nueva Solicitud</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <SolicitudForm onSubmit={handleCrear} buttonText="Enviar Solicitud" />
    </div>
  );
};