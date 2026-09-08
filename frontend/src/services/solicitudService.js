import { CONFIG } from '../config';

const API_BASE_URL = `${CONFIG.apiGatewayUrl}/api/solicitudes`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const solicitudService = {
  // Solicitante
  obtenerMisSolicitudes: async () => {
    const res = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener las solicitudes');
    return res.json();
  },

  obtenerPorId: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener el detalle de la solicitud');
    return res.json();
  },

  crearSolicitud: async (datos) => {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(datos),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al crear la solicitud');
    }
    return res.json();
  },

  editarSolicitud: async (id, datos) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(datos),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar la solicitud');
    }
    return res.json();
  },

  eliminarSolicitud: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar la solicitud');
  },

  // Aprobador
  obtenerPendientes: async () => {
    const res = await fetch(`${API_BASE_URL}/pendientes`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener solicitudes pendientes');
    return res.json();
  },

  aprobarSolicitud: async (id, comentario) => {
    const res = await fetch(`${API_BASE_URL}/${id}/aprobar`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ comentario }),
    });
    if (!res.ok) throw new Error('Error al aprobar la solicitud');
    return res.json();
  },

  rechazarSolicitud: async (id, comentario) => {
    const res = await fetch(`${API_BASE_URL}/${id}/rechazar`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ comentario }),
    });
    if (!res.ok) throw new Error('Error al rechazar la solicitud');
    return res.json();
  },
};