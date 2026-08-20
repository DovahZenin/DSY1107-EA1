import { useEffect, useState, useRef } from 'react';
import { CONFIG } from './config';
import { generateCodeVerifier, generateCodeChallenge } from './pkce';

export default function App() {
  const [tokens, setTokens] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const fetchedRef = useRef(false); // <--- Bandera para evitar doble petición

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const verifier = sessionStorage.getItem('code_verifier');

      // Si ya se procesó o no hay parámetros, abortar
      if (!code || !verifier || fetchedRef.current) return;
      fetchedRef.current = true; 

      const payload = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CONFIG.clientId,
        code: code,
        redirect_uri: CONFIG.redirectUri,
        code_verifier: verifier
      });

      try {
        const res = await fetch(`${CONFIG.cognitoDomain}/oauth2/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload
        });
        const data = await res.json();

        if (res.ok) {
          setTokens(data);
          sessionStorage.setItem('id_token', data.id_token);
          sessionStorage.removeItem('code_verifier');
          window.history.replaceState({}, document.title, "/");
        } else {
          console.error("Error devuelto por Cognito:", data);
        }
      } catch (err) {
        console.error("Error al obtener tokens:", err);
      }
    };

    handleCallback();
  }, []);

  const login = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    sessionStorage.setItem('code_verifier', verifier);

    const loginUrl = `${CONFIG.cognitoDomain}/login?` +
      `client_id=${CONFIG.clientId}&` +
      `response_type=code&` +
      `scope=openid+email+profile&` +
      `redirect_uri=${encodeURIComponent(CONFIG.redirectUri)}&` +
      `code_challenge=${challenge}&` +
      `code_challenge_method=S256`;

    window.location.href = loginUrl;
  };

  const fetchProtectedApi = async () => {
    const token = sessionStorage.getItem('id_token');
    if (!token) return alert("Inicia sesión primero");

    try {
      const res = await fetch(`${CONFIG.apiGatewayUrl}/datos`, {
        headers: { Authorization: token }
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      console.error("Error consumiendo la API:", err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cognito Integration Demo</h1>
      {!tokens ? (
        <button onClick={login}>Iniciar Sesión con Cognito</button>
      ) : (
        <div>
          <p>✅ ¡Autenticado con éxito!</p>
          <button onClick={fetchProtectedApi}>Consumir API Protegida</button>
        </div>
      )}
      {apiResponse && (
        <pre style={{ background: '#f4f4f4', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}