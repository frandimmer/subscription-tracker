import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubscriptions, deleteSubscription } from '../services/subscriptionService';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import SubscriptionCard from '../components/SubscriptionCard';
import './Dashboard.css';

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error al cargar subscripciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta subscripción?')) {
      try {
        await deleteSubscription(id);
        setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la subscripción');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-subscripcion/${id}`);
  };

  // Calcular totales
  const calculateMonthlyTotal = () => {
    return subscriptions
      .filter(sub => sub.status === 'activa')
      .reduce((total, sub) => {
        if (sub.billingCycle === 'mensual') {
          return total + sub.price;
        } else if (sub.billingCycle === 'anual') {
          return total + (sub.price / 12);
        } else if (sub.billingCycle === 'semanal') {
          return total + (sub.price * 4);
        }
        return total;
      }, 0);
  };

  const calculateYearlyTotal = () => {
    return subscriptions
      .filter(sub => sub.status === 'activa')
      .reduce((total, sub) => {
        if (sub.billingCycle === 'mensual') {
          return total + (sub.price * 12);
        } else if (sub.billingCycle === 'anual') {
          return total + sub.price;
        } else if (sub.billingCycle === 'semanal') {
          return total + (sub.price * 52);
        }
        return total;
      }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando subscripciones...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Mis Subscripciones</h1>
          <div className="header-actions">
            <span className="user-name">Hola, {user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {subscriptions.length === 0 ? (
          <div className="empty-state">
            <h2>No tenés subscripciones todavía</h2>
            <p>Empezá agregando tu primera subscripción</p>
            <button onClick={() => navigate('/crear-subscripcion')} className="btn-create-large">
              Agregar primera subscripción
            </button>
          </div>
        ) : (
          <>
            <div className="stats-container">
              <div className="stat-card">
                <span className="stat-label">Total Mensual</span>
                <span className="stat-value">{formatPrice(calculateMonthlyTotal())}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Anual</span>
                <span className="stat-value">{formatPrice(calculateYearlyTotal())}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Subscripciones Activas</span>
                <span className="stat-value">{subscriptions.filter(s => s.status === 'activa').length}</span>
              </div>
            </div>

            <div className="subscriptions-list">
              {subscriptions.map(subscription => (
                <SubscriptionCard
                  key={subscription._id}
                  subscription={subscription}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            <button 
              onClick={() => navigate('/crear-subscripcion')} 
              className="btn-add-subscription"
            >
              + Agregar nueva subscripción
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;