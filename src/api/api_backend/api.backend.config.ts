import { AxiosRequestConfig } from "axios";

const api_back: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL_BACK,
  url: '',
}

export default api_back;
