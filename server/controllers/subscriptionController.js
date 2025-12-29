const Subscription = require('../models/Subscription');

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      subscriptions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las subscripciones', error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { name, description, price, currency, billingCycle, nextBillingDate, category, status } = req.body;

    if (!name || !price || !billingCycle || !nextBillingDate) {
      return res.status(400).json({ message: 'Nombre, precio, ciclo y fecha son obligatorios' });
    }

    const subscription = await Subscription.create({
      name,
      description,
      price,
      currency,
      billingCycle,
      nextBillingDate,
      category,
      status,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la subscripción', error: error.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscripción no encontrada' });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para ver esta subscripción' });
    }

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la subscripción', error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscripción no encontrada' });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para editar esta subscripción' });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      subscription: updatedSubscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la subscripción', error: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscripción no encontrada' });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta subscripción' });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Subscripción eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la subscripción', error: error.message });
  }
};

module.exports = {
  getSubscriptions,
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription
};