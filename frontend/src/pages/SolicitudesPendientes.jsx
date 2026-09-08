import React, { useEffect, useState } from 'react';
import { solicitudService } from '../services/solicitudService';

export const SolicitudesPendientes = () => {
  const [pendientes, setPendientes] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarPendientes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.obtenerPendientes();
      setPendientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPendientes();
  }, []);

  const handleComentarioChange = (id, text) => {
    setComentarios({ ...comentarios, [id]: text });
  };

  const handleProcesar = async (id, accion) => {
    try {
      const comentario = comentarios[id] || '';
      if (accion === 'aprobar') {
        await solicitudService.aprobarSolicitud(id, comentario);
      } else {
        await solicitudService.rechazarSolicitud(id, comentario);
      }
      cargarPendientes();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando solicitudes pendientes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Solicitudes Pendientes de Aprobación</h2>
      {pendientes.length === 0 ? (
        <p>No hay solicitudes pendientes por revisar.</p>
      ) : (
        pendientes.map((sol) => (
          <div key={sol.id} style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', backgroundColor: '#fff' }}>
            <h3>Solicitud #{sol.id} - {sol.tipo}</h3>
            <p><strong>Solicitante ID:</strong> {sol.solicitanteId}</p>
            <p><strong>Descripción:</strong> {sol.descripcion}</p>
            <p><strong>Fechas:</strong> {sol.fechaInicio} al {sol.fechaFin}</p>

            <div style={{ marginTop: '1rem' }}>
              <label><strong>Comentario del Aprobador:</strong></label>
              <textarea
                value={comentarios[sol.id] || ''}
                onChange={(e) => handleComentarioChange(sol.id, e.target.value)}
                placeholder="Escriba un comentario opcional..."
                rows={2}
                style={{ width: '100%', marginTop: '0.25rem', marginBottom: '0.5rem', padding: '0.5rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleProcesar(sol.id, 'aprobar')}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleProcesar(sol.id, 'rechazar')}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};