import api from './api';

export const getSubscriptions = async () => {
  const response = await api.get('/subscriptions');
  return response.data.subscriptions;
};

export const createSubscription = async (subscriptionData) => {
  const response = await api.post('/subscriptions', subscriptionData);
  return response.data.subscription;
};

export const getSubscription = async (id) => {
  const response = await api.get(`/subscriptions/${id}`);
  return response.data.subscription;
};

export const updateSubscription = async (id, subscriptionData) => {
  const response = await api.put(`/subscriptions/${id}`, subscriptionData);
  return response.data.subscription;
};

export const deleteSubscription = async (id) => {
  const response = await api.delete(`/subscriptions/${id}`);
  return response.data;
};