import React, { useState, useEffect } from 'react';

export const SolicitudForm = ({ initialData, onSubmit, buttonText }) => {
  const [tipo, setTipo] = useState('VACACIONES');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    if (initialData) {
      setTipo(initialData.tipo || 'VACACIONES');
      setDescripcion(initialData.descripcion || '');
      setFechaInicio(initialData.fechaInicio || '');
      setFechaFin(initialData.fechaFin || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tipo, descripcion, fechaInicio, fechaFin });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>Tipo de Solicitud:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="VACACIONES">VACACIONES</option>
          <option value="PERMISO">PERMISO</option>
          <option value="OTRO">OTRO</option>
        </select>
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          rows={4}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label>Fecha de Término:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        {buttonText || 'Guardar'}
      </button>
    </form>
  );
};