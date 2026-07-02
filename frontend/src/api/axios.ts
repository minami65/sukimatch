import axios, { AxiosRequestConfig } from 'axios';

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

export default function customInstance<T>(config: AxiosRequestConfig): Promise<T> {
  return api(config).then((response) => response.data);
}
