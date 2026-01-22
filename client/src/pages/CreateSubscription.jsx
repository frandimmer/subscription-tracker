import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSubscription } from '../services/subscriptionService';
import './SubscriptionForm.css';

function CreateSubscription() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'ARS',
    billingCycle: 'mensual',
    nextBillingDate: '',
    category: 'General',
    status: 'activa'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.price || !formData.nextBillingDate) {
      setError('Nombre, precio y fecha son obligatorios');
      return;
    }

    if (formData.price <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    setLoading(true);

    try {
      await createSubscription(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la subscripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-form-container">
      <div className="subscription-form-card">
        <div className="form-header">
          <h2>Nueva Subscripción</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Spotify Premium"
              maxLength="100"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalles adicionales (opcional)"
              rows="3"
              maxLength="300"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1200"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Moneda</label>
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="ARS">ARS - Peso Argentino</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ciclo de pago *</label>
              <select name="billingCycle" value={formData.billingCycle} onChange={handleChange}>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div className="form-group">
              <label>Próximo pago *</label>
              <input
                type="date"
                name="nextBillingDate"
                value={formData.nextBillingDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Ej: Streaming, Productividad"
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="activa">Activa</option>
                <option value="pausada">Pausada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')} 
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Creando...' : 'Crear Subscripción'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSubscription;