import apiClient from './apiClient';

export const submitCustomer = async ({ name, phone }) => {
  const { data } = await apiClient.post('/customers', { name, phone });
  return data.data;
};

export const fetchCustomers = async (params = {}) => {
  const { data } = await apiClient.get('/customers', { params });
  return data;
};

export const fetchCustomerStats = async () => {
  const { data } = await apiClient.get('/customers/stats');
  return data.data;
};
