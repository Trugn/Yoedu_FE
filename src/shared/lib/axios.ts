import axios from 'axios';
import { HTTP_STATUS } from '../types/http-status';
import { refreshTokenApi } from '@/features/auth/api/auth-api';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============ QUEUE PATTERN ============
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// ============ REQUEST INTERCEPTOR ============
// Tự động gắn Access Token vào mọi request
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// ============ RESPONSE INTERCEPTOR ============
// Bắt lỗi 401 và làm mới token nếu cần
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Không xử lý nếu không phải 401
    if (error.response?.status !== HTTP_STATUS.UNAUTHORIZED) {
      return Promise.reject(error);
    }

    // Tránh vòng lặp vô hạn (không retry request refresh-token)
    if (originalRequest.url?.includes('/auth/refresh-token')) {
      // Refresh token thất bại => xóa token + redirect login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    // Nếu đã retry rồi thì bỏ qua
    if (originalRequest._retry) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    // ============ QUEUE LOGIC ============
    if (!isRefreshing) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Gọi API refresh token
        const response = await refreshTokenApi(refreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

        // Cập nhật token mới vào localStorage
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Cập nhật header cho request hiện tại
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Thông báo cho các request đang chờ
        processQueue(null, newAccessToken);

        // Retry request ban đầu
        return axiosClient(originalRequest);
      } catch (err) {
        // Refresh thất bại => xóa token + redirect login
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(err);
      }
    }

    // Nếu đang refresh, thêm request này vào queue
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          originalRequest._retry = true;
          resolve(axiosClient(originalRequest));
        },
        reject: (err: any) => {
          reject(err);
        },
      });
    });
  },
);
