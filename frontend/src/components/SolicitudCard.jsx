import React from 'react';

export const SolicitudCard = ({ solicitud, onEliminar, onEditar, esAprobador, onAprobar, onRechazar }) => {
  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'APROBADA': return '#22c55e';
      case 'RECHAZADA': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Solicitud #{solicitud.id} - {solicitud.tipo}</h3>
        <span style={{ backgroundColor: getBadgeColor(solicitud.estado), color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
          {solicitud.estado}
        </span>
      </div>
      <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
      <p><strong>Fechas:</strong> {solicitud.fechaInicio} al {solicitud.fechaFin}</p>
      {solicitud.comentarioAprobador && (
        <p style={{ backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '4px' }}>
          <strong>Comentario Aprobador:</strong> {solicitud.comentarioAprobador}
        </p>
      )}

      {/* Botones para Solicitante */}
      {!esAprobador && solicitud.estado === 'PENDIENTE' && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={() => onEditar(solicitud.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Editar
          </button>
          <button onClick={() => onEliminar(solicitud.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};