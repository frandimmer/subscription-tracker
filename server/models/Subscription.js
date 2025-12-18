const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede superar los 50 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [100, 'La descripción no puede superar los 100 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  currency: {
    type: String,
    default: 'ARS',
    uppercase: true,
    trim: true
  },
  billingCycle: {
    type: String,
    enum: {
      values: ['semanal', 'mensual', 'anual'],
      message: 'El ciclo debe ser: semanal, mensual o anual'
    },
    required: [true, 'El ciclo de pago es obligatorio']
  },
  nextBillingDate: {
    type: Date,
    required: [true, 'La fecha de próximo pago es obligatoria']
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['activa', 'pausada', 'cancelada'],
      message: 'El estado debe ser: activa, pausada o cancelada'
    },
    default: 'active'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);