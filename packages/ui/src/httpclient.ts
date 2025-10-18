import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// ✅ Create your custom axios instance
const customInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEST_DEV_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor — inject authorization token
customInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ✅ Response interceptor — handle errors globally
customInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Optional: trigger logout or token refresh
      console.warn('Unauthorized, redirecting to login...');
      // e.g., window.location.href = '/login';
    } else if (status >= 500) {
      console.error('Server error:', error.response?.data || error.message);
    }

    return Promise.reject(error);
  },
);

// ✅ Export a mutator function for Orval
export const customInstanceMutator = async <T = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return customInstance.request<T>(config);
};

// ✅ Default export (for flexibility if needed)
export default customInstance;
