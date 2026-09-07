import apiClient from './apiClient';

export const fetchBrands = async () => {
  const { data } = await apiClient.get('/brands');
  return data.data;
};

export const createBrand = async ({ name }) => {
  const { data } = await apiClient.post('/brands', { name });
  return data.data;
};

export const updateBrand = async (id, { name }) => {
  const { data } = await apiClient.put(`/brands/${id}`, { name });
  return data.data;
};

export const deleteBrand = async (id) => {
  const { data } = await apiClient.delete(`/brands/${id}`);
  return data;
};
