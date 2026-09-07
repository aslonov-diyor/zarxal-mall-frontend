import apiClient from './apiClient';

export const fetchPerfumes = async (params = {}) => {
  const { data } = await apiClient.get('/perfumes', { params });
  return data;
};

export const fetchPerfumeById = async (id) => {
  const { data } = await apiClient.get(`/perfumes/${id}`);
  return data.data;
};

export const createPerfume = async (formData) => {
  const { data } = await apiClient.post('/perfumes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const updatePerfume = async (id, formData) => {
  const { data } = await apiClient.put(`/perfumes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const deletePerfume = async (id) => {
  const { data } = await apiClient.delete(`/perfumes/${id}`);
  return data;
};
