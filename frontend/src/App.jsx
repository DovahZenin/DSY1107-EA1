import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Solicitudes } from './pages/Solicitudes';
import { CrearSolicitud } from './pages/CrearSolicitud';
import { EditarSolicitud } from './pages/EditarSolicitud';
import { SolicitudesPendientes } from './pages/SolicitudesPendientes';

export function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Solicitudes />} />
        <Route path="/crear" element={<CrearSolicitud />} />
        <Route path="/editar/:id" element={<EditarSolicitud />} />
        <Route path="/pendientes" element={<SolicitudesPendientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;