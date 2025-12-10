import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// ✅ Client-side axios instance
const customInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor (client-side)
customInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error) => Promise.reject(error),
);

customInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) console.warn('Unauthorized, redirecting...');
    return Promise.reject(error);
  },
);

export const customInstanceMutator = async <T = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => customInstance.request<T>(config);

export default customInstance;
