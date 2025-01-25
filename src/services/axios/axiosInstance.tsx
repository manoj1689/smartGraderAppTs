import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken, removeToken } from '../../utils/tokenUtils';
import { handleError } from '../../utils/ErrorUtils';

const axiosInstance = axios.create({
  baseURL: 'http://api.smartgrader.in', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    NProgress.start();
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    handleError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    handleError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
