import { AxiosRequestConfig } from 'axios';

console.log('MODE: ' + import.meta.env.MODE);

const api_back: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('BaseURL: ' + api_back.baseURL);

export default api_back;
