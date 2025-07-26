import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("admin", "true");
        navigate('/admin-panel');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error al conectar con el servidor', err);
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <div>
      <h2 style={{color:'white'}}>Iniciar sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{margin:"10px", padding:'10px', fontSize:'15px'}}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{margin:"10px", padding:'10px', fontSize:'15px'}}
        />
        <button type="submit" style={{color:'black'}}>Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
