import React from 'react';
import './SubscriptionCard.css';

function SubscriptionCard({ subscription, onDelete, onEdit }) {
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'ARS'
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-AR', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getCycleText = (cycle) => {
    const cycles = {
      'mensual': 'Mensual',
      'anual': 'Anual',
      'semanal': 'Semanal'
    };
    return cycles[cycle] || cycle;
  };

  const getStatusColor = (status) => {
    const colors = {
      'activa': '#27ae60',
      'pausada': '#f39c12',
      'cancelada': '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  return (
    <div className="subscription-card">
      <div className="subscription-header">
        <h3>{subscription.name}</h3>
        <span 
          className="status-badge" 
          style={{ backgroundColor: getStatusColor(subscription.status) }}
        >
          {subscription.status}
        </span>
      </div>

      {subscription.description && (
        <p className="subscription-description">{subscription.description}</p>
      )}

      <div className="subscription-info">
        <div className="info-item">
          <span className="label">💰 Precio:</span>
          <span className="value">{formatPrice(subscription.price, subscription.currency)}</span>
        </div>
        <div className="info-item">
          <span className="label">🔄 Ciclo:</span>
          <span className="value">{getCycleText(subscription.billingCycle)}</span>
        </div>
        <div className="info-item">
          <span className="label">📅 Próximo pago:</span>
          <span className="value">{formatDate(subscription.nextBillingDate)}</span>
        </div>
        <div className="info-item">
          <span className="label">📁 Categoría:</span>
          <span className="value">{subscription.category}</span>
        </div>
      </div>

      <div className="subscription-actions">
        <button onClick={() => onEdit(subscription._id)} className="btn-edit">
          Editar
        </button>
        <button onClick={() => onDelete(subscription._id)} className="btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;