import { AxiosRequestConfig } from 'axios';

export type ApiEvoRequestConfig = AxiosRequestConfig & {
  cursor?: unknown;
};

const api_v2: ApiEvoRequestConfig = {
  baseURL: 'https://api.evotor.ru/',
  url: '',
  headers: {
    Accept: 'application/vnd.evotor.v2+json',
    'Content-Type': 'application/vnd.evotor.v2+json',
    'X-Authorization': '',
  },
};

export default api_v2;
