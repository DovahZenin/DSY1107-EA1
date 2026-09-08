import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ onLogout, modo, setModo }) => {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '1rem', background: '#1e293b', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Gestión de Solicitudes</h2>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Mis Solicitudes</Link>
        <Link to="/crear" style={{ color: '#fff', textDecoration: 'none' }}>Nueva Solicitud</Link>
        <Link to="/pendientes" style={{ color: '#fff', textDecoration: 'none' }}>Vista Aprobador</Link>
      </div>
      <div>
        <button
          onClick={onLogout}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};