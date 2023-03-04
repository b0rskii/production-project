import axios from 'axios';
import { LocalStorageKey } from 'shared/const/localStorage';

export const api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(LocalStorageKey.USER),
  },
});
