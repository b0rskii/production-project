import axios from 'axios';
import { LocalStorageKey } from '@/6_shared/const/localStorage';

export const api = axios.create({
  baseURL: __API__,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.authorization = localStorage.getItem(LocalStorageKey.USER) || '';
  }
  return config;
});
