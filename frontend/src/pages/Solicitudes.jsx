import React, { useEffect, useState } from 'react';
import { solicitudService } from '../services/solicitudService';
import { SolicitudCard } from '../components/SolicitudCard';
import { useNavigate } from 'react-router-dom';

export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.obtenerMisSolicitudes();
      setSolicitudes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Desea eliminar esta solicitud?')) {
      try {
        await solicitudService.eliminarSolicitud(id);
        cargarSolicitudes();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  if (loading) return <p>Cargando solicitudes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Mis Solicitudes</h2>
      {solicitudes.length === 0 ? (
        <p>No tienes solicitudes registradas.</p>
      ) : (
        solicitudes.map((sol) => (
          <SolicitudCard
            key={sol.id}
            solicitud={sol}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
          />
        ))
      )}
    </div>
  );
};