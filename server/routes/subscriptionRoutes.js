const express = require('express');
const {
  getSubscriptions,
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getSubscriptions)
  .post(protect, createSubscription);

router.route('/:id')
  .get(protect, getSubscription)
  .put(protect, updateSubscription)
  .delete(protect, deleteSubscription);

module.exports = router;