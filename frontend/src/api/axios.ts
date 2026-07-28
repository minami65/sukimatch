import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { API_BASE } from '../config';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Orvalのmutatorとして動作する関数
// config だけでなく、後ろの引数（optionsなど）も全て引き渡せるように展開（...config）します
export default function customInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return api({
    ...config,
    ...options,
  })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
}
