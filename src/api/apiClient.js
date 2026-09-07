import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 45000, // Render free tier "uyg'onishi" mumkin — uzunroq timeout
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('zarxal_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Server bilan bog\u2019lanishda xatolik yuz berdi.';

    if (!error.response) {
      message = 'Internet aloqasini tekshiring.';
    } else {
      const { status, data } = error.response;
      if (data?.message) {
        message = data.message;
      } else if (status === 401) {
        message = 'Avval tizimga kiring.';
      } else if (status === 403) {
        message = 'Sizda bu amalni bajarish huquqi yo\u2019q.';
      } else if (status === 404) {
        message = 'Ma\u2019lumot topilmadi.';
      }

      if (status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('zarxal_admin_token');
        localStorage.removeItem('zarxal_admin');
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
