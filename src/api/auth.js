import apiClient from './apiClient';

export const adminLogin = async ({ phone, name }) => {
  const { data } = await apiClient.post('/auth/login', { phone, name });
  return data;
};

export const fetchDashboardStats = async () => {
  const { data } = await apiClient.get('/dashboard/stats');
  return data.data;
};
