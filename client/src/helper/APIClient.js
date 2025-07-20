import axios from 'axios';

const BASE_URL = import.meta.env.BASE_URL;
const TIMEOUT = import.meta.env.API_TIMEOUT || 10000;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor (e.g., token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API Error [${error.response.status}]:`, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Static API Client Utility Class
 */
class APIClient {
  static async get(url, params = {}, config = {}) {
    const response = await axiosInstance.get(url, { params, ...config });
    return response.data;
  }

  static async post(url, data = {}, config = {}) {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }

  static async put(url, data = {}, config = {}) {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  }

  static async delete(url, config = {}) {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  }
}

export default APIClient;
