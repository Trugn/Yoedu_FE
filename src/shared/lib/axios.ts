import axios from 'axios';
import { HTTP_STATUS } from '../types/http-status';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in headers
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('HTTP Error:', error.response);

    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      // clear auth
      localStorage.removeItem('accessToken');

      // redirect login
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  },
);
