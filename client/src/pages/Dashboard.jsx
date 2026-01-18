import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.name}!</p>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;